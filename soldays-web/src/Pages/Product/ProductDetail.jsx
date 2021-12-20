import React, {useRef, useState,useCustomHooks } from 'react'
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


export default function ProductDetail(){
    const { Product_Code } = useParams();

    console.log(Product_Code)


    const [inputQty,setInputQty]=useState(0)
    const [isInputQty,setIsInputQty]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [ProductRender,setProductRender]=useState(undefined)
    const [CityCompany,setCityCompany ] = useState('')
    const [allComment,setAllComment]=useState(undefined)


    // GET DATA FROM USEEFFECT
    useEffect(()=>{

    })

    // GET DATA FROM USEEFFECT



    // SCROLL MENU HEADER
    const scrollY = useScrollPosition(60 /*frames per second*/);
    const [scrollZero,setScrollZero] = useState(true)
    const [scrollNone,setScrollNone] = useState(true)
    useEffect(()=>{

        if(isLoading){
            Axios.post(`https://products.sold.co.id/get-product-details?product_code=${Product_Code}`)
            .then((res)=>{
                console.log(res.data)
                setProductRender(res.data)
                setIsLoading(false)
                var find_city = res.data.PIC_company_address.split(',')
                console.log(find_city)
                var CityCompany = find_city[4]
                setCityCompany(CityCompany)   
                // console.log(res.data.User_Comments)
                var comment_stringify = JSON.parse(res.data.User_Comments)
                // console.log(comment_stringify)
                setAllComment(comment_stringify)
            
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            console.log(scrollY)
            if(scrollY === 0 ){
                setScrollZero(true)
            }else {
                setScrollZero(false)
            }
    
    
            let elHeight = document.querySelector('.ulasan-product-detail').clientHeight
            // let elHeight = document.querySelector('.box-detail-product-description').clientHeight
            var finalHeight = elHeight - 270
            console.log(finalHeight)
    
            if(scrollY > finalHeight) {
                setScrollNone(false)
            }else {
                setScrollNone(true)
            }
        }



    },[Product_Code, isLoading, scrollY, scrollZero])

    // scroll menu header


    const onInputQtyProduct=(qty)=>{
        console.log(parseInt(qty))
        if(qty !==  0 && qty > 0 ){
            setIsInputQty(true)
            setInputQty(qty)
        }else if (qty === 0  || qty < 0){
            setInputQty(1)
            setIsInputQty(false)
        }else {
            console.log('masuk ke else line 72 product detail. lebih dari 0 / kurang dari 0')
            setInputQty(1)
            setIsInputQty(false)
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

    const renderComment = ( )=>{
        console.log(ProductRender.User_Comments)

        if(ProductRender.User_Comments === undefined || ProductRender.User_Comments === null || ProductRender.User_Comments.length === 0 ) {
            console.log('masih kosong')
        }else {
            console.log(allComment)
                return allComment.map((val,index)=>{
                    console.log(val)
                })
        }
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
            <div className="box-container-product-detail">
                <Header/>
                {/* <div className="header-slider-product-detail "> */}
                <div className={scrollZero ? "header-slider-product-detail" : "header-slider-product-detail active-box-slider" }>
                    <div className="product-name-slider-box ">
                        <p>{ProductRender.Name}</p>
                    </div>
                    <div className="box-option-product-slider">
                        <div className="box-option-1 slider-active-product-detail">
                            <p>Info Product</p>
                        </div>
                        <div className="box-option-1">
                            <p>Ulasan</p>
                        </div>
                        <div className="box-option-1">
                            <p>Diskusi</p>
                        </div>
                        <div className="box-option-1">
                            <p>Rekomendasi</p>
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

                <div className="detail-product-box ">
                    {/* <section className="box-detail-product-img"> */}
                    <section className={scrollNone ? 'box-detail-product-img img-appeared' : 'box-detail-product-img img-hide'}>
                        <div className="box-img-pd">
                                <img src={ProductRender.Picture_1} alt="" />
                        </div>
                        <div className="box-option-img-product">
                            <div className="final-box-img-option active-final-box-img">
                                <img src={Sealant} alt="" />
                            </div>
                            <div className="final-box-img-option">
                                <img src={Sealant} alt="" />
                            </div>
                            <div className="final-box-img-option">
                                <img src={Sealant} alt="" />
                            </div>
                            <div className="final-box-img-option">
                                <img src={Sealant} alt="" />
                            </div>
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
                                                        {renderComment()}
                                                        {/* <p>PENGIRIMAN DARI : JAKARTA</p> */}
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

                    <section className="box-detail-product-price">

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
                                            <IoIosArrowDropup className="icon-arrow-up nonactive-icon"/>
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
                                        <div className="box-qty-plus">
                                            <FiMinus className="icon-minus"/>
                                            <input type="text" className="input-qty-plus"  placeholder='1'/>
                                            <BsPlus className="icon-plus"/>
                                        </div>
                                        <p>Stok 100</p>
                                    </div>
                                    : 
                                    <>
                                    
                                    </>
                                }
                            </div>
                            <div className="section-keranjang-product-detail">
                                <p>+ Keranjang</p>
                            </div>
                            <div className="section-beli-product-detail">
                                <p>+ Beli</p>
                            </div>
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

                <div className="ulasan-product-detail" >
                    <div className="total-ulasan-box">
                        <p>Semua Ulasan (320)</p>
                    </div>

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
                    
                </div>
                <div className="section-for-similar-item">
                    <div key={1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={Sealant} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
                            <ImgEffect data={{
                                img:Sealant,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={Sealant} alt="" />
                            </div>
                        </div>
                    </div>
                    <div key={1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={Sealant} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
                            <ImgEffect data={{
                                img:Sealant,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={Sealant} alt="" />
                            </div>
                        </div>
                    </div>
                    <div key={1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={Sealant} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
                            <ImgEffect data={{
                                img:Sealant,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={Sealant} alt="" />
                            </div>
                        </div>
                    </div>
                    <div key={1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={Sealant} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
                            <ImgEffect data={{
                                img:Sealant,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={Sealant} alt="" />
                            </div>
                        </div>
                    </div>
                    <div key={1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={Sealant} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
                            <ImgEffect data={{
                                img:Sealant,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={Sealant} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}