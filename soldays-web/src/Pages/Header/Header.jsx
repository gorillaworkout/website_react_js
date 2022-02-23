import React, { useState,useEffect,useCallback,useMemo } from 'react'
// import './Header.css'
import '../../Styles/Header.scss'
import { css,  } from '@emotion/react'

import {BsPhone,BsSearch} from 'react-icons/bs'
import {AiOutlineLogout,AiOutlineLogin} from 'react-icons/ai'
import {logo_soldays,logo_login,logo_qr_scan,logo_shopping_cart,logo_unpaid_list} from '../../Assets/Assets'
import Select from 'react-select'
import {useDispatch,useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    
  } from "reactstrap";
  import Modal from 'react-bootstrap/Modal'
import ImgEffect from '../../Component/Effect/img_effect'
import CartKosongTokped from '../../Assets/tokped_gambar/cart-kosong.jpeg'
import {FcMoneyTransfer} from 'react-icons/fc'
import Gopay_icon from '../../Assets/tokped_gambar/gopay-icon.png'
import {LogoutRedux} from '../../redux/Actions/AuthActions'
import TikiLogo from '../../Assets/all_icon/logoTiki.png'
import ProductCard from '../../Component/ProductCard/ProductCard'
import Highlight from '../../Component/Highlight/highlight'
import TabPane from 'react-bootstrap/TabPane'
import { Tabs, Tab, Row, Nav } from "react-bootstrap";
import axios from 'axios'
import debounce from "lodash.debounce";
import { RiContrastDropLine } from 'react-icons/ri'
import {updateToCartRedux} from '../../redux/Actions/ProductActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header(data){
    toast.configure()
    const dispatch=useDispatch()
    // console.log(React.version,' react version');

    const Product = useSelector(state=>state.Product)
    // console.log(Product)
    const Cart = useSelector(state=>state.Cart)
    const Auth = useSelector(state=>state.Auth)
    const Order = useSelector(state=>state.Order)

    const [showModalListBulk,setShowModalListBulk]=useState(false)
    const [dataSearching,setDataSearching]=useState([])
    const [allProductFromHome,setAllProductFromHome]=useState(Product.allProduct) // ini dipake buat render yg lain
    const [allProductRedux,setAllProductRedux]=useState(Product.allProduct) // ini dipake buat render searching input bulk order
    const [allCategoryFromHome,setAllCategoryFromHome]=useState(Product.allSubCategory)
    const [allSubcategoryFromHome,setAllSubcategoryFromHome]=useState(Product.allSubCategory)
    const [headerHome,setHeaderHome]=useState(true)

    const [cartFromRedux,setCartFromRedux]=useState(Cart.Cart)
    const [totalCartRedux,setTotalCartRedux]=useState(0)
    const [allOrderList,setAllOrderList]=useState(Order.allOrder)
    const [totalOrderList,setTotalOrderList]=useState(0)

    const [isMenuHoverCart,setIsMenuHoverCart]=useState(false) 
    const [isMenuHoverBulkOrder,setIsMenuHoverBulkOrder]=useState(false) 
    const [isMenuHoverOrderList,setIsMenuHoverOrderList]=useState(false) 
    const [isMenuHoverLogin,setIsMenuHoverLogin]=useState(false)
    const [isMenuHoverAllCategory,setisMenuHoverAllCategory]=useState(false)

    const [category_Active,setCategory_Active] = useState('')
    const [subCategory_Active,setSubCategory_Active]=useState('')

    // console.log(cartFromRedux)

    const [toggleCart,setToggleCart]=useState(false)
    const [toggleLogin,setToggleLogin]=useState(false)
    const [toggleBulkOrder,setToggleBulkOrder]=useState(false)
    const [togglePesanan,setTogglePesanan]=useState(false)
    const [toggleAllCategory,setToggleAllCategory]=useState(false)


    const [isLoginHeader,setIsLoginHeader]=useState(Auth.isLogin)
  
    const [activeInputBulk,setActiveInputBulk]=useState()
    const [activeInputQty,setActiveInputQty]=useState()
    const options_product_searching = []
    const location = useLocation();
    // console.log(location)

    
    useEffect(()=>{
        // IF UNTUK RENDER SEARCHING PRODUCT
        if(allProductFromHome !==null || allProductFromHome.length > 0){
            allProductFromHome.forEach((val,index)=>{
                options_product_searching.push({
                    value:
                    {"nama_product":val.Name,
                     "product_id":val.Product_Code
                    },
                    label:val.Name
                })
            })
        }
        // IF UNTUK RENDER SEARCHING PRODUCT

        if(location.pathname === '/' || location.pathname.includes('/beli-langsung')){
            // console.log('location di home', location)
            setHeaderHome(true)
        }else {
            // console.log(location)
            setHeaderHome(false)
        }

        

    })

    useEffect(()=>{
        if(Cart.Cart){
            setTotalCartRedux(Cart.Cart.length)
            // console.log('Cart Reducer ada isinya',Cart.Cart)
        }else {
            setTotalCartRedux(0)
            // console.log('Cart Reducer kosong',Cart.Cart)
        }

        if(Order.allorder){
            // console.log(Order)
            // console.log(Order.totalOrder)
            setAllOrderList(Order.allOrder)
            setTotalOrderList(Order.totalOrder)
        }else{
            setTotalOrderList(0)
        }
 
        
        setIsLoginHeader(Auth.isLogin)
        // console.log('Auth is Login skrng ' , Auth.isLogin)
        
    },[Auth.isLogin, Auth.token, Cart.Cart, Order.allOrder, Order.allorder, Order.totalOrder, allOrderList])
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
    // function searching header

    // function searching header


    const render_searching_product=()=>{
        return (
            <>
                <Select 
                css={css`
                    width：100% !important;
                `}
                    isClearable={true}
                    // value={currentValueProduct}
                    backspaceRemovesValue={true}
                    // onChange={open_product}
                    options={options_product_searching}
                    placeholder="Cari Barangmu disini"
                />
            </>
        )
    }
    const render_random_category=()=>{
        // console.log(allCategoryFromHome)
        if(allCategoryFromHome !== undefined){
            return allCategoryFromHome.map((val,index)=>{ 
                if(index<5){
                    return (
                        <>
                            <Link to={`/Subcategory/${val[0].allSubcategory[0].Subcategory}`} style={{textDecoration:'none'}} key={index} className="category-random-item" >
                                <p>{val[0].Category}</p>
                            </Link>
                        </>
                    )
                }else {
                    return (
                        <>
                            
                        </>
                    )
                }
            })
        }
    }

    const onMouseEnter=(params)=>{
        
        if(params === 'Cart'){
            setIsMenuHoverCart(true)
            setToggleCart(true)
            var cartLocalStorage = JSON.parse(localStorage.getItem('itemsInCart'))
            // console.log(Cart.Cart !== cartLocalStorage,'cart.cart!== cart local storage')
            if(cartLocalStorage){
                if(Cart.Cart === cartLocalStorage){
                    setCartFromRedux(cartLocalStorage)
                    setTotalCartRedux(cartLocalStorage.length)
                }else {
                    dispatch({type:'GETALLCARTSTORAGE',cartLocalStorage})
                    setCartFromRedux(cartLocalStorage)
                    setTotalCartRedux(cartLocalStorage.length)
                }
            }else {
                setTotalCartRedux(0)
            }
        }else if (params === 'BulkOrder'){
            setIsMenuHoverBulkOrder(true)
            setToggleBulkOrder(true)
        }else if(params === 'pesanan'){
            setIsMenuHoverOrderList(true)
            setTogglePesanan(true)
            if(allOrderList !== undefined){
                //data udah ada 
                console.log(allOrderList)
                setAllOrderList(Order.allOrder)
                setTotalOrderList(Order.totalOrder)
            }else {
                axios.post(`https://sales.sold.co.id/get-sales-order-data-per-customer?Customer_Code=${Auth.token}`)
                .then((res)=>{
                    if(res.data){
                        let allDataOrder = res.data
                        setAllOrderList(allDataOrder)
                    }else {
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }

        }else if (params === 'Login'){
            setIsMenuHoverLogin(true)
            setToggleLogin(true)
        }else if (params === 'allCategory'){
            setisMenuHoverAllCategory(true)
            setToggleAllCategory(true)
        }


    }
    const onMouseLeave=()=>{
        setToggleCart(false)
        setToggleLogin(false)
        setToggleAllCategory(false)
        setTogglePesanan(false)
        
        setIsMenuHoverCart(false)
        setIsMenuHoverOrderList(false)
        setIsMenuHoverLogin(false)

        if(showModalListBulk){

        }else {
            setIsMenuHoverBulkOrder(false)
            setToggleBulkOrder(false)
        }
    }

    // const toggleCartFunc=()=>{
    //     setToggleCart(!toggleCart)
    // }


    const renderOrderList=()=>{
        if(allOrderList){
            return allOrderList.map((val,index)=>{
                let total_price = parseInt(val.Total_Price) + parseInt(val.Shipping_Fee)
                return (
                <>
                    <Link to={'/cart'}  key={1} className="render-item-list-cart">
                        <div className="render-img-list-cart">
                            <ImgEffect data={{
                                img:TikiLogo,
                                background:'transparent'
                                }}
                            />
                        </div>
                        <div className="render-name-list-cart">
                            <p className='p-limited-text'>{val.Order_Number}</p>
                            <p>{val.Total_Quantity} {val.Unit}</p>
                        </div>
                        <div className="render-price-list-cart">
                            <p className="p-price-limited">RP.{commafy(total_price)}</p>
                        </div>
                    </Link>
                </>
                )
                
            })
        }else {
            return (
                null
            )
        }
    }
    const renderProductCart=()=>{

        if(cartFromRedux){
            return cartFromRedux.map((val,index)=>{
                var total_cart = cartFromRedux.length
                var item_weight = parseFloat(val.weight_kg)
                var total_weight = (item_weight * parseInt(val.quantity)).toFixed(2)
                var total_price = parseInt(val.quantity) * (parseInt(val.normal_price))
                return (
                    <Link to={'/cart'}  key={index+1} className="render-item-list-cart">
                        <div className="render-img-list-cart">
                            <ImgEffect data={{
                                img:val.img,
                                background:'#ccc'
                                }}
                            />
                        </div>
                        <div className="render-name-list-cart">
                            <p className='p-limited-text'>{val.product_name}</p>
                            <p>{val.quantity} Barang ({total_weight}kg)</p>
                        </div>
                        <div className="render-price-list-cart">
                            <p className="p-price-limited">RP.{commafy(total_price)}</p>
                        </div>
                    </Link>
                )
            })
        }else {
            return (
                null
            )
        }
    }

    const logout_user=()=>{
        // alert('function logout jalan')
        dispatch(LogoutRedux())
    }
    const onSubcategoryClick=(subCategory)=>{
        console.log(subCategory)
        setSubCategory_Active(subCategory)
    }
    const onCategoryClick=(Category,subcategory)=>{
        // console.log(Category)
        // console.log(subcategory)
        var all_findsubcategory = []
        var find_subcategory = allProductFromHome.filter((val)=>{
            if(val.Category === Category){
                all_findsubcategory.push(val)
                return val.Subcategory
            }
        })

        setCategory_Active(Category)
        setSubCategory_Active(subcategory)
    }

    // RENDER PRODUCT CARD HOVER ALL CATEGORY
        const render_product_allCategory=()=>{
            return Product.allSubCategory.map((val,index)=>{
                return (
                    <>
                        <Nav.Item>
                            <Nav.Link eventKey={index+1} onClick={()=>onCategoryClick(val[0].Category,val[0].allSubcategory[0].Subcategory)}>{val[0].Category}</Nav.Link>
                        </Nav.Item>
                                           
                    </>
                    
                )
            })
        }

        const render_isi_allCategory=()=>{
            const renderListSubCategory=(subcategory,index)=>{
                if(index === 0){ // nyari index ke 0 buat dibikin active pas baru dibuka
                    if(subcategory.length > 0 ){
                        return subcategory.map((val,index)=>{
                            if(index === 0){
                                return (
                                    <>
                                        <li  onClick={()=>onSubcategoryClick(val.Subcategory)}>
                                            {val.Subcategory}
                                        </li>
                                    </>
                                )
                            }else {
                                return (
                                    <>
                                        <li onClick={()=>onSubcategoryClick(val.Subcategory)}>
                                            {val.Subcategory} 
                                        </li>
                                    </>
                                )
                            }             
                        })
                    }else {
                        return (
                            <>
                                <li className="active-subcategory" onClick={()=>onSubcategoryClick(subcategory[0].allSubcategory)}> 
                                    {subcategory[0].allSubcategory}
                                </li>
                            </>
                        )
                    } 
                }else { // render sisanya 
                    if(subcategory.length > 0 ){ // cari index ke 0 biar pas pindah udh ada yg active
                        return subcategory.map((val,index)=>{
                            if(index === 0){
                                return (
                                    <>
                                        <li  onClick={()=>onSubcategoryClick(val.Subcategory)}>
                                            {val.Subcategory}
                                        </li>
                                    </> 
                                )
                            }else {
                                return (
                                    <>
                                        <li onClick={()=>onSubcategoryClick(val.Subcategory)}>
                                            {val.Subcategory}
                                        </li>
                                    </>
                                )
                            }  
                        })
                    }else {
                        return (
                            <>
                                <li onClick={()=>onSubcategoryClick(subcategory[0].allSubcategory)}>
                                    {subcategory[0].allSubcategory}
                                </li>
                            </>
                        )
                    } 
                }
            }


            const renderListProduct=()=>{
                var filter_for_render = []
                var filter_product = allProductFromHome.filter((val)=>{
                    if(val.Subcategory === subCategory_Active){
                        filter_for_render.push(val)
                        return val
                    }
                })
                
                if(filter_product.length > 1){
                    return filter_product.map((val,index)=>{
                        console.log(val)
                        return(
                            <>
                                <Link to={`/ProductDetail/${val.Product_Code}`} className="card-product-allcategory" >
                                    <div className="box-img-product">
                                        <ImgEffect data={{
                                            img:val.Picture_1,
                                            background:'transparent'
                                            }}
                                        />
                                    </div>
                                    <div className="box-detail-name">
                                        <p>{val.Name}</p>
                                    </div>
                                </Link>
                            </>
                        )

                    })
                }else {
                    return (
                        <>
                           <Link to={`/ProductDetail/${filter_product[0].Product_Code}`}  className="card-product-allcategory">
                                <div className="box-img-product">
                                    <ImgEffect data={{
                                        img:filter_product[0].Picture_1,
                                        background:'transparent'
                                        }}
                                    />
                                </div>
                                <div className="box-detail-name">
                                    <p>{filter_product[0].Name}</p>
                                </div>
                            </Link>
                
                        </>
                    )
                }
                
            }

            return allSubcategoryFromHome.map((val,index)=>{ 
                return (
                    <Tab.Pane eventKey={index+1} title={val.Category}>
                        <div className="box-category-hover">
                            <div className="box-subcategory-hover">
                                <ul>
                                    {renderListSubCategory(val[0].allSubcategory,index)}
                                </ul>
                            </div>
                            <div className="box-product-category-hover">
                                <div className="box-title-category">
                                    <p>{subCategory_Active}</p>
                                </div>
                                <div className="box-detail-product"> 
                                    {renderListProduct()}
                                </div>
                                
                            </div>
                        </div>
                    </Tab.Pane>
                )
            })
        }
    // RENDER PRODUCT CARD HOVER ALL CATEGORY

   
    const onInputQty=(value,id)=>{
        console.log(value,id)
    }
    const onInputBulk=(value,id)=>{
        
        if (value.length > 3){

            let filterAllProduct = []
            allProductRedux.filter((val,index)=>{
                if(val.Name.toUpperCase().includes(value.toUpperCase())){
                    console.log('masuk ke if 524')
                    filterAllProduct.push(val)
                }
            })
            console.log(filterAllProduct)
            setAllProductRedux(filterAllProduct)
            // setAllProductFromHome(filterAllProduct)
            setShowModalListBulk(true)
            setActiveInputBulk(id)
        }else {
            setAllProductRedux(Product.allProduct)
            setShowModalListBulk(false)
        }
    }


    let callbackDebounce_1 =  useCallback(debounce((e)=>onInputBulk(e.target.value,'inp_bulk_1'), 500), []);
    let callbackDebounce_2 =  useCallback(debounce((e)=>onInputBulk(e.target.value,'inp_bulk_2'), 500), []);
    let callbackDebounce_3 =  useCallback(debounce((e)=>onInputBulk(e.target.value,'inp_bulk_3'), 500), []);
    let callbackDebounce_4 =  useCallback(debounce((e)=>onInputBulk(e.target.value,'inp_bulk_4'), 500), []);

    
    
    const onChooseItem=(value)=>{
        console.log('on choose item jalan')
        let allElement = Array.from(document.querySelectorAll('.input-bulk')) // semua input yang udh ke isi /kosong 
        let elementItem = document.querySelector(`#${activeInputBulk}`) // input yang sedang di isi
        let findIndexDuplicate = allElement.findIndex((val)=>{
            return val.value === value.Name
        })
        
        if(findIndexDuplicate !== -1){
            console.log(findIndexDuplicate)
            let elementQty = document.querySelector(`#inp_qty_${findIndexDuplicate+1}`)
            console.log(elementQty.value,'input qty')
            let total_qty = (parseInt(elementQty.value) + 1)
            elementQty.value = total_qty
            elementItem.value = ''
        }else {
            elementItem.value = value.Name
        }
        setShowModalListBulk(false)
    }
    const onAddToCart=()=>{
        let allCart = JSON.parse(localStorage.getItem('itemsInCart'))
        let allElementBulk = Array.from(document.querySelectorAll('.input-bulk'))
        console.log(allElementBulk)
        console.log(allCart)
        allElementBulk.forEach((val,index)=>{
            allCart.forEach((value,id)=>{
                if(val.value === value.product_name){
                    console.log('masuk ke if ')
                    // ini berarti ada data yg sama di cart, jadi cuma update quantity
                    console.log(val.value,index)
                    console.log(value.product_name,id)
                    let filterProduct = allProductFromHome.filter((val,index)=>{
                        if(val.Name === value.product_name){
                            return val
                        }
                    })
                    console.log(filterProduct)
                    let dataParse = JSON.parse(localStorage.getItem('itemsInCart'))

                    axios.post(`https://products.sold.co.id/get-product-details?product_code=${filterProduct[0].Product_Code}`)
                    .then((res)=>{
                        console.log(res.data)
                    }).catch((err)=>{
                        console.log(err)
                    })
                    
                }else {
                    // ini berarti update cart nambah product yg ada di cart
                    if(val.value !== ''){
                        console.log(val.value)
                        console.log(index+1,' ini index looping')
                        let total_qty = document.querySelector(`#inp_qty_${index+1}`).value
                        console.log(total_qty)
                        console.log('masuk ke else ')
                        let filterProduct = allProductFromHome.filter((item,index)=>{
                            if(item.Name === val.value){
                                return val
                            }
                        })
                        console.log(filterProduct)
                        var dataParse = JSON.parse(localStorage.getItem('itemsInCart'))
                        axios.post(`https://products.sold.co.id/get-product-details?product_code=${filterProduct[0].Product_Code}`)
                        .then((res)=>{
                            console.log(res.data)
                            let quantity_product = parseInt(res.data.Stock_Quantity)
                            if( quantity_product === 0  ||
                                quantity_product === "0" ||
                                quantity_product === undefined ||
                                quantity_product === null ||
                                isNaN(quantity_product) || 
                                quantity_product < 0){
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
                                    dispatch(updateToCartRedux(filterProduct[0].Product_Code,total_qty,res.data.PIC_company_address,res.data.Weight_KG,res.data.Name,dataParse,res.data.Picture_1,res.data.Sell_Price,res.data.GroupBuy_SellPrice,quantity_product))
                                    console.log('masuk ke else redux jalan')
                                }
                        }).catch((err)=>{
                            console.log(err)
                        })
                    }else {
                        console.log('masuk ke else')
                    }
                }
            })
        })
    }
    const renderAllProductList=()=>{
        return allProductRedux.map((val,index)=>{
            return (
                <>
                    <div className="box-list-card-bo" onClick={()=>onChooseItem(val)}>
                        <img src={val.Picture_1} alt="" />
                        <p>{val.Name} </p>
                    </div>
                </>
            )
        })
    }
    return(
        
        <>
            <Modal
                show={showModalListBulk}
                onHide={() => setShowModalListBulk(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                className="modal-list-bulk"
                centered
                >
                <Modal.Header closeButton className="modal-header-success">
                <Modal.Title className="modal-header-success-cart" id="example-custom-modal-styling-title">
                    <p>Pilih barang yang anda inginkan</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-bulk-order">
                    {renderAllProductList()}       
                </Modal.Body>
            </Modal>



            <div className={headerHome ? 'header-container' : 'header-container-fixed' }>
                <div className="header-top">
                    <div className="header-download-app" >
                        <BsPhone className="icon-hp-download"/>
                        <p>Download Sold App</p>
                    </div>
                    <div className="header-top-option">
                        <div className="option-top-header-box" >
                            <p>About Us</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Kebijakan</p>
                        </div>
                        <div className="option-top-header-box" >
                            <p>Panduan Customer</p>
                        </div>
                        <div className="option-top-header-box" >
                            <p>Panduan Seller</p>
                        </div>
                        <div className="option-top-header-box" >
                            <p>Our Social Media</p>
                        </div>
                        <div className="option-top-header-box" >
                            <p>Out Catalog</p>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <Link to='/' className="box-logo-header">
                        <img src={logo_soldays} alt="" />
                    </Link>
                    <div className="all-category-header-box"    
                        onMouseOver={()=>onMouseEnter('allCategory')}  
                        onMouseLeave={onMouseLeave} 
                    >         
                        <Dropdown
                            isOpen={toggleAllCategory}
                            toggle={() => {}}
                            >
                            <DropdownToggle caret>
                                <p>Semua  Kategori</p>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-toggle-allcategory">                            
                                <Tab.Container defaultActiveKey={1}>
                                    <Nav variant="pills" className="flex-column">
                                        <Row>        
                                            {render_product_allCategory()}
                                        </Row>
                                    </Nav>
                                    <Tab.Content>
                                        {render_isi_allCategory()}
                                    </Tab.Content>
                                </Tab.Container>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="box-searching-product-header">
                        <div className="input-box-searching">
                            {/* SEARCHING INPUT */}
                            {render_searching_product()}
                        </div>
                        <div className="category-random-box">
                            {render_random_category()}
                        </div>
                    </div>
                    <div className="menu-from-header">
                        <div className="item-menu-1">
                            <Dropdown
                                onMouseOver={()=>onMouseEnter('pesanan')}
                                onMouseLeave={onMouseLeave}
                                isOpen={togglePesanan}
                                toggle={() => {}}
                                // onClick={new_open_order_list}
                                >
                                <DropdownToggle caret>   
                                    <div className={isMenuHoverOrderList? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'} >
                                        <img src={logo_unpaid_list} alt="" />
                                        <p>Pesanan Saya</p>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-toggle-cart">
                                {
                                    
                                    totalOrderList > 0 ? 
                                        <div className="dropdown-item-list-cart">
                                            <div className="dropdown-item-keranjang-list-cart">
                                                <p>Pesanan ({totalOrderList})</p>
                                                <Link to={'/cart'} style={{textDecoration:'none',color:'#27aae1'}}>Lihat Sekarang</Link>
                                            </div>
                                            {renderOrderList()}
                                        </div>
                                        :
                                        <div className="cart-kosong-list-cart">
                                            <div className="box-img-cart-kosong">
                                                <ImgEffect data={{
                                                    img:CartKosongTokped,
                                                    background:'transparent'
                                                    }}
                                                />
                                            </div>
                                            <p>Wah Pesanan Belanjaaanmu Kosong!</p>
                                            <p>Daripada dianggurin, isi saja dengan barang-barang menarik. Lihat-lihat dulu, siapa tahu ada yang kamu suka!</p>
                                        </div> 
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="item-menu-1">
                            <Dropdown
                                onMouseOver={()=>onMouseEnter('BulkOrder')}
                                onMouseLeave={onMouseLeave}
                                isOpen={toggleBulkOrder}
                                // onClick={new_open_bulk_order}
                                toggle={() => {}}
                                >
                                <DropdownToggle caret>   
                                    <div className={isMenuHoverBulkOrder ? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'}>
                                        <img src={logo_qr_scan} alt="" />
                                        <p>Bulk Order</p>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-toggle-cart">
                                    <div className="dropdown-item-list-cart">
                                        <div className="dropdown-item-keranjang-list-cart">
                                            <p>Line By Line </p>
                                            <p id="copypas">Copy & Paste</p>
                                        </div>
                                        <div className="box-bulk-order">
                                            <div className="bulk-left">
                                                <p>Product Code / Product Name</p>
                                                <input type="text" className="input-bulk" id="inp_bulk_1" onChange={callbackDebounce_1} />
                                                <input type="text" className="input-bulk" id="inp_bulk_2" onChange={callbackDebounce_2} />
                                                <input type="text" className="input-bulk" id="inp_bulk_3" onChange={callbackDebounce_3} />
                                                <input type="text" className="input-bulk" id="inp_bulk_4" onChange={callbackDebounce_4} />     
                                           
                                            </div>
                                            <div className="bulk-right">
                                                <p>Qty</p>
                                                <input type="number" placeholder={1} min={1} className="input-qty" id="inp_qty_1" defaultValue={1} onChange={(e)=>onInputQty(e.target.value,'inp_qty_1')}/>
                                                <input type="number" placeholder={1} min={1} className="input-qty" id="inp_qty_2" defaultValue={1} onChange={(e)=>onInputQty(e.target.value,'inp_qty_2')}/>
                                                <input type="number" placeholder={1} min={1} className="input-qty" id="inp_qty_3" defaultValue={1} onChange={(e)=>onInputQty(e.target.value,'inp_qty_3')} />
                                                <input type="number" placeholder={1} min={1} className="input-qty" id="inp_qty_4" defaultValue={1} onChange={(e)=>onInputQty(e.target.value,'inp_qty_4')} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-addcart" onClick={onAddToCart}>
                                        ADD TO CART
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="item-menu-1">
                            <Dropdown
                                onMouseOver={()=>onMouseEnter('Cart')}
                                onMouseLeave={onMouseLeave}
                                isOpen={toggleCart}
                                // onClick={new_open_cart}
                                toggle={() => {}}
                                >
                                <DropdownToggle caret>
                                    <div className={isMenuHoverCart? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'}>
                                        <div className="box-cart-counter" >
                                            <img src={logo_shopping_cart} alt=""  id="img-cart-counter"/>
                                            <p id="cart-counter">{totalCartRedux}</p>
                                        </div>
                                            <p>Cart</p>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-toggle-cart">
                                    {
                                        totalCartRedux > 0 ? 
                                        <div className="dropdown-item-list-cart">
                                            <div className="dropdown-item-keranjang-list-cart">
                                                <p>Keranjang ({totalCartRedux})</p>
                                                <Link to={'/cart'} style={{textDecoration:'none',color:'#27aae1'}}>Lihat Sekarang</Link>
                                            </div>
                                            
                                            {renderProductCart()}
                                        </div>
                                        :
                                        <div className="cart-kosong-list-cart">
                                            <div className="box-img-cart-kosong">
                                                <ImgEffect data={{
                                                    img:CartKosongTokped,
                                                    background:'transparent'
                                                    }}
                                                />
                                            </div>
                                            <p>Wah Keranjang Belanjaaanmu Kosong!</p>
                                            <p>Daripada dianggurin, isi saja dengan barang-barang menarik. Lihat-lihat dulu, siapa tahu ada yang kamu suka!</p>
                                        </div> 
                                    }
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="item-menu-1">
                            {
                            isLoginHeader?
                                <Dropdown
                                    onMouseOver={()=>onMouseEnter('Login')}
                                    onMouseLeave={onMouseLeave}
                                    isOpen={toggleLogin}
                                    toggle={() => {}}
                                    >
                                    <DropdownToggle caret>   
                                        <div className={isMenuHoverLogin? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'}>
                                            <AiOutlineLogout className="icon-login-logout"/>
                                            <p>Logout</p>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-toggle-cart">
                                    <div className="dropdown-menu-auth-header">
                                        <div className="profile-menu-auth-header">
                                            <div className="box-img-profile-menu-auth-header">
                                                <img src={CartKosongTokped} alt="" />
                                            </div>
                                            <p>BAYU DARMAWAN</p>
                                        </div>
                                        <div className="box-option-auth-header">
                                            <div className="box-option-left-auth">
                                                <div className="small-box-option-auth">
                                                    <div className="box-img-icon-payment-auth">
                                                        <img src={Gopay_icon} alt="" />
                                                    </div>
                                                    <p>GoPay</p>
                                                    <p>Aktifkan</p>
                                                </div>
                                                <div className="small-box-option-auth">
                                                    <div className="box-img-icon-payment-auth">
                                                        <img src={Gopay_icon} alt="" />
                                                    </div>
                                                    <p>GoPay</p>
                                                    <p>Aktifkan</p>
                                                </div>
                                                <div className="small-box-option-auth">
                                                    <div className="box-img-icon-payment-auth">
                                                        <img src={Gopay_icon} alt="" />
                                                    </div>
                                                    <p>GoPay</p>
                                                    <p>Aktifkan</p>
                                                </div>
                                            </div>
                                            <div className="box-option-right-auth">
                                                <div className="box-menu-right-auth">
                                                    <p>Pembelian</p>
                                                    <p>Wishlist</p>
                                                    <p>Product Favorite</p>
                                                    <p>Pengaturan</p>
                                                </div>     
                                                <div className="box-login-logout-auth">
                                                    <AiOutlineLogout className="icon-login-logout"/>
                                                    <p onClick={logout_user}>Logout</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        {/* <DropdownItem>Submenu 1.1</DropdownItem> */}
                                    </DropdownMenu>
                                    {/* &nbsp;&nbsp;&nbsp; */}
                                </Dropdown>
                                :
                                <div className='new-box-login-register-header'>
                                    <Link to ='/login' className="new-box-login-auth">
                                        <p>Masuk</p>
                                    </Link>
                                    <Link to='/register' className="new-box-register-auth">
                                        <p>Daftar</p>
                                    </Link>
                                </div>

                            }
                          
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

