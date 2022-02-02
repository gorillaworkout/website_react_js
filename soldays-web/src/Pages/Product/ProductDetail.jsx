import React, {useRef, useState,useLayoutEffect } from 'react'
import './ProductDetail.css'
import Header from '../Header/Header'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

// import { useWindowSize } from "@react-hook/window-size/throttled";
// import { useWindowSize as useWindowSizeD } from "@react-hook/window-size/";
import useScrollPosition from "@react-hook/window-scroll";
import { useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {Vantsing_logo} from '../../Assets/Assets'
import {GrLocation} from 'react-icons/gr'
import Sealant from '../../Assets/tokped_gambar/sealant.png'
import {IoIosArrowDropup,IoIosArrowDropdown} from 'react-icons/io'
import {FaCommentAlt} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillShareFill} from 'react-icons/bs'
// import ImgEffect from '../../Component/Effect/img_effect';
import ImgEffect from '../../Component/Effect/img_effect'
import {BsPlus} from 'react-icons/bs'
import {FiMinus} from 'react-icons/fi'
import { useParams } from "react-router-dom";
import Axios from 'axios'
import {FullPageLoading} from '../../Component/Loading/Loading'
import ProductCard from '../../Component/ProductCard/ProductCard';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux'
import {Link as LinkScroll} from 'react-scroll'
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify';
import {addToCartRedux,updateToCartRedux} from '../../redux/Actions/ProductActions'
import Footer from '../../Component/Footer/Footer'
import LazyLoad from 'react-lazyload';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetail(){
    toast.configure()
    const dispatch=useDispatch()
    const { Product_Code } = useParams();
    const Product = useSelector(state=>state.Product)
    const scrollToTop = useRef(null);
    const listRef = useRef(null)

    const [showModalSuccessCart, setShowModalSuccessCart] = useState(false);
    const [inputQty,setInputQty]=useState(0)
    const [totalInputQty,setTotalInputQty]=useState(1)
    const [totalHargaProduct,setTotalHargaProduct]=useState(0)
    const [isInputQty,setIsInputQty]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [ProductRender,setProductRender]=useState(undefined)
    const [CityCompany,setCityCompany ] = useState('')
    const [allComment,setAllComment]=useState(undefined)
    const [imgActive,setImgActive]=useState(undefined)
    const [imgActiveId,setImgActiveId]=useState(1)
    const [totalComment,setTotalComment]=useState(undefined)
    const [cartFromStorage,setCartFromStorage]=useState(undefined)
    const [cartFromRedux,setCartFromRedux]=useState(Product.Cart)
    const [dataToCardPromo,setDataToCardPromo]=useState({
        isTokpedAds:false,
        allProductItem: Product.allProduct
    })

    const [isScrollActive,setIsScrollActive]=useState(1)

    // GET DATA HEIGHT FOR SCROLLING 
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    const [scrollProductPrice,setScrollProductPrice]=useState(true)

    useLayoutEffect(() => {
        if (listRef.current) {
          setDimensions({
            width: listRef.current.offsetWidth,
            height: listRef.current.offsetHeight
          });
        }
       
    }, []);
    // console.log(dimensions)

    // GET DATA HEIGHT FOR SCROLLING 

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
          });
          
    })



    // SCROLL MENU HEADER
    const scrollY = useScrollPosition(60 /*frames per second*/);
    const [scrollZero,setScrollZero] = useState(true)
    const [scrollNone,setScrollNone] = useState(true)
    useEffect(()=>{

        if(isLoading){
            // console.log('101 isloading true')
            Axios.post(`https://products.sold.co.id/get-product-details?product_code=${Product_Code}`)
            .then((res)=>{
                setProductRender(res.data)
                setImgActive(res.data.Picture_1)
                var find_city = res.data.PIC_company_address.split(',')
                var CityCompany = find_city[4]
                setCityCompany(CityCompany)   
                var comment_stringify = JSON.parse(res.data.User_Comments)
                if(comment_stringify !== null &&  comment_stringify !== undefined ){
                    
                    var total_comment = comment_stringify.length
                    if(total_comment === null || total_comment === undefined){
                        total_comment = 0
                    }
                    setTotalComment(total_comment)
                    setAllComment(comment_stringify)
                    setTimeout(()=>{
                        setIsLoading(false)
                    },500)
                }else {
                    setTotalComment(0)
                    setTimeout(()=>{
                        setIsLoading(false)
                    },500)
                    // console.log('comment stringify masih null / undefined')
                }
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            // console.log(scrollY)
            var Product_Code_Now = Product_Code
            if(Product_Code_Now !== Product_Code){

            }     
    
    
            let elHeight = document.querySelector('.ulasan-product-detail').clientHeight
            // let elHeight = document.querySelector('.box-detail-product-description').clientHeight
            var finalHeight = elHeight - 100
            if(totalComment === 0 ){
                finalHeight = 250
            }
            if(scrollY > finalHeight) {
                setScrollNone(false)
            }else {
                setScrollNone(true)
            }
        }

        



    },[Product_Code, isLoading, scrollY, scrollZero, totalComment])

    // SCROLL MENU HEADER


    const onInputQtyProduct=(qty)=>{
        console.log(parseInt(qty))
        var harga_product  = parseInt(ProductRender.Sell_Price)
        
        if(qty !==  0 && qty > 0  ){
            setIsInputQty(true)
            setInputQty(qty)
            if(qty > ProductRender.Stock_Quantity){
                var hitung_harga = ProductRender.Stock_Quantity * harga_product
                setTotalHargaProduct(hitung_harga)
                setTotalInputQty(ProductRender.Stock_Quantity)
                
            }else {
                var hitung_harga = qty * harga_product
                setTotalHargaProduct(hitung_harga)
                setTotalInputQty(qty)
            }

            
        }else if (qty === 0  || qty < 0){
            setInputQty(1)
            setIsInputQty(false)
            setTotalInputQty(1)
            var hitung_harga = harga_product * 1
            setTotalHargaProduct(hitung_harga)
        }else {
            console.log('masuk ke else line 72 product detail. lebih dari 0 / kurang dari 0')
            setInputQty(1)
            setTotalInputQty(1)
            setIsInputQty(false)
            var hitung_harga = harga_product * 1
            setTotalHargaProduct(hitung_harga)
        }
    }

    function commafy( num ) {
        if(num !==undefined){
            var str = num.toString().split('.');
            if (str[0].length >= 5) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 5) {
                str[1] = str[1].replace(/(\d{3})/g, '$1 ');
            }
            return str.join('.');
        }else {
            return '0'
        }
    }

    const renderComment = (params)=>{
        // console.log(ProductRender.User_Comments)
        

        if(ProductRender.User_Comments === undefined || ProductRender.User_Comments === null || ProductRender.User_Comments.length === 0 ) {
            console.log('masih kosong')
        }else {
            // console.log(allComment)
           
                return allComment.map((val,index)=>{
                    return (
                        // <ProductCard data={dataToCardPromo}/>
                        <div className="all-total-comment-product-detail">
                            <div className="comment-customer-product">
                                <div className="customer-profile-img">
                                    <div className="img-box-customer">
                                        <img src={Sealant} alt="" />
                                    </div>
                                    <div className="customer-name-box">
                                        <p>BAYU DARMAWAN</p>
                                    </div>
                                </div>
                                <div className="box-comment-from-customer">
                                    <div className="comment-box-customer">
                                        <p>SANGAT RECOMMENDED, TIDAK MENYESAL SAYA MEMBELINYA DISINI, LAIN KALI AKAN SAYA BELI LAGI DISINI, SUMPAH, GAK BOHONG, DEMI DEH. </p>
                                    </div>
                                    <div className="seller-thankyou-comment">
                                        <div className="box-for-img-tq">
                                            <div className="img-box-customer">
                                                <img src={Sealant} alt="" />
                                            </div>
                                        </div>
                                        <div className="seller-information-detail-comment">
                                            <div className="seller-name-detail">
                                                <p>VANTSING INTERNATIONAL</p>
                                                <div className="penjual-box-detail">
                                                    <p>Penjual</p>
                                                </div>
                                            </div>
                                            <div className="all-comment-from-tq">
                                                <p>Terima Kasih telah Berbelanja di Vantsing international, kepada teman teman anda dan favoritkan toko kami untuk terus</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        }
    }


    const renderCardSuccessCart=()=>{

        // console.log(Product.allCategoryGroupBuy)
        return Product.allCategoryGroupBuy.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal - discount
            if(index < 4){
                return (
                    <div key={index+1} className="new-card-success-cart">
                        <div className="img-new-card-success-cart">
                            <ImgEffect 
                                data={{
                                    img:ProductRender.Picture_1,
                                    background:'transparent'
                                }}
                            />
                        </div>
                        <span className="span-name-product-success-cart">{ProductRender.Name}</span>
                        <div className="new-price-card-success-cart">
                            <span>Rp{commafy(hargaAwal)}</span>
                            <span>Rp{commafy(hargaTotal)}</span>
                        </div>
                    </div>
                )
            }
        })
    }
    const renderAllProductSuccessCart=()=>{
        return Product.allProduct.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount= parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal - discount
            return (
                <div key={index+1} className="new-card-success-cart">
                    <div className="img-new-card-success-cart">
                        <ImgEffect 
                            data={{
                                img:ProductRender.Picture_1,
                                background:'transparent'
                            }}
                        />
                    </div>
                    <span className="span-name-product-success-cart">Sealant Asli Dari Bandung Hitam Putih Hijau</span>
                    <div className="new-price-card-success-cart">
                        <span>Rp{commafy(hargaAwal)}</span>
                        <span>Rp{commafy(hargaTotal)}</span>
                    </div>
                </div>
            )
        })
    }

    const changeImg=(img,id)=>{
        if(id === 1){
            setImgActive(img)
            setImgActiveId(1)
        }else if ( id === 2){
            setImgActive(img)
            setImgActiveId(2)
        }else{
            setImgActive(img)
            setImgActiveId(3)
        }
    }
    const changeScrollStatus=(id)=>{
        if(id === 1) {
            setIsScrollActive(1)
        }else if (id === 2) {
            setIsScrollActive(2)
        }else {
            setIsScrollActive(3)
        }
    }



    const tambahQtyTotal=()=>{
        if(totalInputQty  === ProductRender.Stock_Quantity || totalInputQty > ProductRender.Stock_Quantity) {

        }else {
            var qty_now = parseInt(totalInputQty)
            var hitung_harga = parseInt(ProductRender.Sell_Price) * (qty_now + 1)
            setTotalInputQty(qty_now + 1)
            setTotalHargaProduct(hitung_harga)
        }
    }
    const kurangQtyTotal=()=>{
        if(totalInputQty < ProductRender.Stock_Quantity && totalInputQty > 0) {
            var qty_now = totalInputQty
            var hitung_harga = parseInt(ProductRender.Sell_Price) * (qty_now - 1)
            setTotalInputQty(totalInputQty - 1)
            setTotalHargaProduct(hitung_harga)
        }else if ( totalInputQty > 0) {
            var qty_now = totalInputQty
            var hitung_harga = parseInt(ProductRender.Sell_Price) * (qty_now - 1)
            setTotalInputQty(totalInputQty - 1)
            setTotalHargaProduct(hitung_harga)
        }else if ( totalInputQty === 0 || totalInputQty < 0){
            console.log('input qty 0')
        }
    }

    const addToCart=(Product_Code)=>{
        console.log(ProductRender)
        var quantity_product = parseInt(ProductRender.Stock_Quantity)
        
        if(
            quantity_product === 0  ||
            quantity_product === "0" ||
            quantity_product === undefined ||
            quantity_product === null ||
            isNaN(quantity_product) || 
            quantity_product < 0
        ){
            // alert('stock tidak tersedia')
            toast.error('Stock Tidak Tersedia', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }else {
            var dataParse = JSON.parse(localStorage.getItem('itemsInCart'))
            console.log(dataParse)
            if(dataParse){
                dispatch(updateToCartRedux(Product_Code,totalInputQty,ProductRender.PIC_company_address,ProductRender.Weight_KG,ProductRender.Name,dataParse,ProductRender.Picture_1,ProductRender.Sell_Price,ProductRender.GroupBuy_SellPrice,quantity_product))
                setShowModalSuccessCart(true)
            }else {
                /**
                 *     ! Items in Cart Kosong, berarti langsung push bikin object di local storage
                 */
                 dispatch(addToCartRedux(Product_Code,totalInputQty,ProductRender.PIC_company_address,ProductRender.Weight_KG,ProductRender.Name,ProductRender.Picture_1,ProductRender.Sell_Price,ProductRender.GroupBuy_SellPrice,quantity_product))
                setShowModalSuccessCart(true)
            }
        }
    }

    const BuyNow=(Product_Code)=>{
        alert('buy now jalan')
    }
    
    if(isLoading){
        return (
            <>
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                    {FullPageLoading(isLoading,100,'#0095DA')}
                </div>
            </>
        )
    }
    return (
        <>
            <Modal
                show={showModalSuccessCart}
                onHide={() => setShowModalSuccessCart(false)}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton className="modal-header-success">
                <Modal.Title className="modal-header-success-cart" id="example-custom-modal-styling-title">
                    <p>Berhasil Ditambahkan</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-success-cart">
                        <div className="box-success-cart-product">
                            <div className="box-img-success-cart-product">
                                <ImgEffect
                                    data={{
                                        img:ProductRender.Picture_1,
                                        background:'#ccc'
                                    }}
                                />
                            </div>
                            <div className="box-name-success-cart-product">
                                <span>{ProductRender.Name}</span>
                            </div>
                            <Link to={'/cart'} className="box-btn-lihat-keranjang-success-cart-product">
                                <span>Lihat Keranjang</span>
                            </Link>
                        </div>
                        <div className="lengkapi-kebutuhan-success-cart">
                            <span>Lengkapi Kebutuhan</span>
                            <div className="render-box-random-product-top-success-cart">
                                {renderCardSuccessCart()}   
                            </div>
                            <span>Produk Lain Dari Toko Ini</span>
                            <div className="render-box-random-product-top-success-cart">
                                {renderAllProductSuccessCart()}   
                            </div>

                        </div>
                </Modal.Body>
            </Modal>
            <div className="box-container-product-detail" id="box-top-product"ref={listRef}  >
                <Header/>
                {/* <div className="header-slider-product-detail "> */}
                <div className={scrollZero ? "header-slider-product-detail" : "header-slider-product-detail active-box-slider" }>
                    <div className="product-name-slider-box ">
                        <p>{ProductRender.Name}</p>
                    </div>
                    <div className="box-option-product-slider">
                        <div className={ isScrollActive === 1 ? 'box-option-1 slider-active-product-detail' : 'box-option-1'}>
                            <LinkScroll to="box-top-product" onClick={()=>changeScrollStatus(1)} smooth={true} duration={100}>Info Product</LinkScroll>
                        </div>
                        <div className={ isScrollActive === 2 ? 'box-option-1 slider-active-product-detail' : 'box-option-1'}>
                            <LinkScroll to="ulasan-id" onClick={()=>changeScrollStatus(2)} smooth={true} duration={100}>Ulasan</LinkScroll>
                        </div>
                        <div className={ isScrollActive === 3 ? 'box-option-1 slider-active-product-detail' : 'box-option-1'}>
                            <LinkScroll to="similar-product-id" onClick={()=>changeScrollStatus(3)} smooth={true} duration={100}>Rekomendasi</LinkScroll>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-product-detail-box container">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Product Detail
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{ProductRender.Name}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="detail-product-box " >    
                    <section className={scrollNone ? 'box-detail-product-img img-appeared' : 'box-detail-product-img img-hide'} id="top-info" >
                        <div className="box-img-pd">
                                
                                <ImgEffect
                                    data={{
                                        img:imgActive,
                                        background:'#ccc'
                                    }}
                                />
                        </div>
                        <div className="box-option-img-product">
                            {
                                ProductRender.Picture_1 !== null && ProductRender.Picture_1 !== "" ? 
                                    <div className={imgActiveId === 1 ? 'final-box-img-option active-final-box-img' : 'final-box-img-option'} onClick={()=>changeImg(ProductRender.Picture_1,1)}>
                                        <ImgEffect
                                            data={{
                                                img:ProductRender.Picture_1,
                                                background:'#ccc'
                                            }}
                                        />
                                    </div>
                                :
                                <>
                                
                                </>
                            }
                            {
                                ProductRender.Picture_2 !== null && ProductRender.Picture_2 !== "" ? 
                                    <div className={imgActiveId === 2 ? 'final-box-img-option active-final-box-img' : 'final-box-img-option'} onClick={()=>changeImg(ProductRender.Picture_2,2)}>
                                        <ImgEffect
                                            data={{
                                                img:ProductRender.Picture_2,
                                                background:'#ccc'
                                            }}
                                        />
                                    </div>
                                :
                                <>
                                
                                </>
                            }
                            {
                                ProductRender.Picture_3 !== null && ProductRender.Picture_1 !== "" ? 
                                    <div className={imgActiveId === 3 ? 'final-box-img-option active-final-box-img' : 'final-box-img-option'} onClick={()=>changeImg(ProductRender.Picture_3,3)}>
                                        <ImgEffect
                                            data={{
                                                img:ProductRender.Picture_3,
                                                background:'#ccc'
                                            }}
                                        />
                                    </div>
                                :
                                <>
                                
                                </>
                            }
                           
                        </div>

                    </section>
                    <section className="box-detail-product-description">
                        <div className="description-detail-pd">
                            <p>{ProductRender.Name}</p>
                        </div>
                        <div className="description-price-pd">
                            <p>RP {commafy(ProductRender.Sell_Price)}</p>
                        </div>
                        <div className="detail-description-product">
                            <Tabs defaultActiveKey="detail" id="uncontrolled-tab-example" className="mb-3">
                                <Tab eventKey="detail" title="Detail">
                                    <div className="box-tab-description">
                                        <div className="box-inside-description">
                                                <ul className="ul-box-description">
                                                    <li className="li-box-description">
                                                        <span>Kondisi : </span>
                                                        <span className="main-li-box"> Baru</span>
                                                    </li>
                                                    <li className="li-box-description">
                                                        <span>Kategori : </span>
                                                        <span className="main-li-box"> {ProductRender.Category}</span>
                                                    </li>   
                                                    <li className="li-box-description">
                                                        <span>Sub Kategori : </span>
                                                        <span className="main-li-box"> {ProductRender.Subcategory}</span>
                                                    </li>       
                                                </ul>
                                                <div className="main-description-detail-product">
                                                    <p dangerouslySetInnerHTML={{ __html: ProductRender.Description}}>
                                                        {/* {ProductRender.Description} */}
                                                    </p>
                                                    <p dangerouslySetInnerHTML={{ __html: ProductRender.Specification}}>
                                                        {/* {ProductRender.Description} */}
                                                    </p>
                                                   
                                                </div>
                                                <div className="company-description-box">
                                                    <div className="img-box-company-description">
                                                        <div className="img-company-description">
                                                            <img src={Vantsing_logo} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="company-description-detail">
                                                        <p>{ProductRender.PIC_company_name} </p>
                                                        <p>
                                                            <GrLocation/> <span>Pengiriman Dari {CityCompany}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="infopenting" title="Info Penting">
                                    <p>Info Penting</p>
                                </Tab>
                            </Tabs>
                        </div>
                    </section>
                    <section className={scrollProductPrice ? 'box-detail-product-price' : 'box-detail-product-price scroll-off-absolute'}>

                        {/* <div className="section-input-item input-terisi"> */}
                        <div className={isInputQty ? 'section-input-item input-terisi':'section-input-item'}>
                            <div className="section-varian-top">
                                <p>Pilih Varian</p>
                                {
                                isInputQty ? 
                                    <IoIosArrowDropup className="icon-arrow-up flip-icon" />
                                :
                                    <IoIosArrowDropup className="icon-arrow-up" />
                                }
                            </div>

                            <div className="section-pilih-item-box">
                                <p>Quantity : 1pcs</p>
                                <input type="number" className="input-pcs-product" onChange={(e)=>onInputQtyProduct(e.target.value)} />
                            </div>
                            <div className="section-pilih-item-box2">
                                <div className="section-pilih-item-top">
                                    
                                    {
                                    isInputQty ? 
                                        <>
                                            <p className="total_harga ">Total Harga dan quantity</p>
                                            <IoIosArrowDropup className="icon-arrow-up"/>
                                        </>
                                        :
                                        <>
                                            <p className="total_harga nonactive-icon">Total Harga dan quantity</p>
                                            <IoIosArrowDropup className="icon-arrow-up nonactive-icon flip-icon"/>
                                        
                                        </>
                                        // <IoIosArrowDropdown className="icon-arrow-up nonactive-icon"/>
                                    }
                                    
                                </div>

                                {
                                isInputQty ? 
                                    <div className="box-for-plus-minus-qty">
                                        <div className="box-btn-plus-minus">
                                            <div className="box-qty-plus">
                                                <FiMinus className="icon-minus" onClick={kurangQtyTotal}/>
                                                <input type="text" className="input-qty-plus"  value={totalInputQty} x/>
                                                <BsPlus className="icon-plus" onClick={tambahQtyTotal}/>
                                            </div>
                                            <p>Stock {ProductRender.Stock_Quantity}</p>
                                        </div>
                                        <div className="subtotal-product-detail">
                                            <p>Subtotal</p>
                                            <p>RP {commafy(totalHargaProduct)}</p>
                                        </div> 
                                    </div>
                                    : 
                                    <>
                                    
                                    </>
                                }
                            </div>
                            {
                                isInputQty ? 
                                <div className="section-keranjang-product-detail hover-effect-btn" disabled={isInputQty} onClick={()=>addToCart(ProductRender.Product_Code)}>
                                    <p className="p-active-cart">+ Keranjang</p>
                                </div>
                                :
                                <div className="section-keranjang-product-detail button-non-active" disabled={isInputQty}>
                                    <p className="p-non-active">+ Keranjang</p>
                                </div>
                            }
                            {
                                isInputQty ? 
                                <Link to={`/beli-langsung/${ProductRender.Product_Code}`} className="section-beli-product-detail hover-effect-btn" disabled={isInputQty} >
                                    <p className="p-active-buy">+ Beli</p>
                                </Link>
                                :
                                <div className="section-beli-product-detail button-non-active" disabled={isInputQty}>
                                    <p className="p-non-active">+ Beli</p>
                                </div>

                            }
                            <div className="section-for-icon-input">
                                <div className="box-icon-quantity-product">
                                    <FaCommentAlt className="icon-comment"/>
                                    <p>Chat</p>
                                </div>
                                <div className="box-icon-quantity-product-2">
                                    <AiFillHeart className="icon-comment"/>
                                    <p>Wishlist</p>
                                </div>
                                <div className="box-icon-quantity-product">
                                    <BsFillShareFill className="icon-comment"/>
                                    <p>Share</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="ulasan-product-detail" id="ulasan-id">
                    {
                        totalComment === 0 ? 
                        <>
                            <div className="input-comment-product-detail" >
                                <div className="box-input-ulasan">
                                    <p>Masukan Ulasan</p>
                                    <input type="text" maxLength="100" className="input-ulasan-npd"/>
                                    <div className="btn-upload-ulasan" >
                                        Masukan
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="total-ulasan-box">
                                <p>Semua Ulasan ({totalComment})</p>
                            </div>
                            {renderComment()}
                            <div className="input-comment-product-detail">
                                <div className="box-input-ulasan">
                                    <p>Masukan Ulasan</p>
                                    <input type="text" maxLength="100" className="input-ulasan-npd"/>
                                    <div className="btn-upload-ulasan" >
                                        Masukan
                                    </div>
                                </div>
                            </div>
                        </>

                    }
                </div>
                <div className="section-for-similar-item" ref={scrollToTop} id="similar-product-id">
                    <ProductCard data={dataToCardPromo}/>
                </div>

                {/* <div className="box-highlight2">
                        <LazyLoad>
                                <Footer/>
                        </LazyLoad>
                </div> */}
            </div>
        </>
    )
}