import React, { useState,useEffect, } from 'react'
import './Header.css'
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
import ImgEffect from '../../Component/Effect/img_effect'
import CartKosongTokped from '../../Assets/tokped_gambar/cart-kosong.jpeg'
import {FcMoneyTransfer} from 'react-icons/fc'
import Gopay_icon from '../../Assets/tokped_gambar/gopay-icon.png'
import {LogoutRedux} from '../../redux/Actions/AuthActions'
import ProductCard from '../../Component/ProductCard/ProductCard'
import Highlight from '../../Component/Highlight/highlight'
import TabPane from 'react-bootstrap/TabPane'
import { Tabs, Tab, Row, Nav } from "react-bootstrap";
import axios from 'axios'
export default function Header(data){
    const dispatch=useDispatch()
    // console.log(React.version);

    const Product = useSelector(state=>state.Product)
    // console.log(Product)
    const Cart = useSelector(state=>state.Cart)
    const Auth = useSelector(state=>state.Auth)


    // console.log(Auth)
    // const [isRandomCategory,setIsRandomCategory]=useState(false)
    // const [category_random,setCategory_random]=useState('')
    const [dataSearching,setDataSearching]=useState([])
    const [allProductFromHome,setAllProductFromHome]=useState(Product.allProduct)
    const [allCategoryFromHome,setAllCategoryFromHome]=useState(Product.allCategory)
    const [allSubcategoryFromHome,setAllSubcategoryFromHome]=useState(Product.allSubCategory)
    const [headerHome,setHeaderHome]=useState(true)
    const [cartFromRedux,setCartFromRedux]=useState(Cart.Cart)
    const [totalCartRedux,setTotalCartRedux]=useState(0)
    const [isMenuHoverCart,setIsMenuHoverCart]=useState(false) 
    const [isMenuHoverBulkOrder,setIsMenuHoverBulkOrder]=useState(false) 
    const [isMenuHoverOrderList,setIsMenuHoverOrderList]=useState(false) 
    const [isMenuHoverLogin,setIsMenuHoverLogin]=useState(false)
    const [isMenuHoverAllCategory,setisMenuHoverAllCategory]=useState(false)

    const [category_Active,setCategory_Active] = useState(allSubcategoryFromHome[0][0].Category)
    const [subCategory_Active,setSubCategory_Active]=useState(allSubcategoryFromHome[0][0].allSubcategory[0].Subcategory)


    const [typeHoverCategory,setTypeHoverCategory] = useState(0)
    const [typeActiveCategory,setTypeActiveCategory]=useState(0)
    // console.log(cartFromRedux)

    const [toggleCart,setToggleCart]=useState(false)
    const [toggleLogin,setToggleLogin]=useState(false)
    const [toggleAllCategory,setToggleAllCategory]=useState(false)
    const [allIsData,setAllIsData]=useState(
        {
            isLogin:Auth.isLoading,
            isSemuaKategori:false,
            isOrderList:false,
            isBulkOrder:false,
            isCart:false,
            isAboutUs:false,
            isKebijakan:false,
            isPanduanSeller:false,
            isPanduanCustomer:false,
            isSocialMedia:false,
            isCatalog:false,
            isDownloadApp:false,
            isRandomCategory:false,
            category_random:''
        }
    )

    const [isLoginHeader,setIsLoginHeader]=useState(Auth.isLogin)
  
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
        
        setIsLoginHeader(Auth.isLogin)
        // console.log('Auth is Login skrng ' , Auth.isLogin)
        
    },[Auth.isLogin, Cart.Cart])
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
    const open_product=(e)=>{
        var nama_product = e
        if(nama_product === null){

        }else {
            setDataSearching(e.value)
            data.parentCallback({"searching_header":e.value})
        }
    }
    // function searching header

    const open_download_app=()=>{
        data.parentCallback({"download_app":!allIsData.isDownloadApp})
        setAllIsData({...allIsData,
        isDownloadApp:!allIsData.isDownloadApp,
        isSemuaKategori:false,
        isOrderList:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_order_list=()=>{
        data.parentCallback({"order_list":!allIsData.isOrderList})
        setAllIsData({...allIsData,
        isOrderList:!allIsData.isOrderList,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })

    }
    const open_bulk_order=()=>{
        data.parentCallback({"bulk_order":!allIsData.isBulkOrder})
        setAllIsData({...allIsData,
        isBulkOrder:!allIsData.isBulkOrder,
        isDownloadApp:false,
        isSemuaKategori:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_semua_kategori=()=>{
        data.parentCallback({"semua_kategori":!allIsData.isSemuaKategori})
        setAllIsData({...allIsData,
        isSemuaKategori:!allIsData.isSemuaKategori,
        isDownloadApp:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    
    const open_cart=()=>{
        data.parentCallback({"cart":!allIsData.isCart})
        setAllIsData({...allIsData,
        isCart:!allIsData.isCart,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }

    const open_login=()=>{
        data.parentCallback({"login":!allIsData.isLogin})
        setAllIsData({...allIsData,
        isLogin:!allIsData.isLogin
    })
    }

    const open_logout=()=>{
        data.parentCallback({"login":!allIsData.isLogin})
        setAllIsData({...allIsData,isLogin:!allIsData.isLogin})
    }

    const open_random_category=(category)=>{
        // setCategory_random(category)
        var data_from_cart =[
            {"random_kategori":!allIsData.isRandomCategory},
            {"category_random_item":category}
        ] 
        data.parentCallback(data_from_cart)
        setAllIsData({
            ...allIsData,
        category_random:category,
        isRandomCategory:!allIsData.isRandomCategory,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        })

    }
    const open_aboutus=()=>{
        data.parentCallback({"about_us":!allIsData.isAboutUs})
        setAllIsData({...allIsData,
        isAboutUs:!allIsData.isAboutUs,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_kebijakan=()=>{
        data.parentCallback({"kebijakan":!allIsData.isKebijakan})
        setAllIsData({...allIsData,
        isKebijakan:!allIsData.isKebijakan,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    
    })
    }
    const open_panduan_customer=()=>{
        data.parentCallback({"panduan_customer":!allIsData.isPanduanCustomer})
        setAllIsData({...allIsData,
        isPanduanCustomer:!allIsData.isPanduanCustomer,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_panduan_seller=()=>{
        data.parentCallback({"panduan_seller":!allIsData.isPanduanSeller})
        setAllIsData({...allIsData,
        isPanduanSeller:!allIsData.isPanduanSeller,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_social_media=()=>{
        data.parentCallback({"social_media":!allIsData.isSocialMedia})
        setAllIsData({...allIsData,
        isSocialMedia:!allIsData.isSocialMedia,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isCatalog:false,
        isRandomCategory:false,
        category_random:''
    })
    }
    const open_catalog=()=>{
        data.parentCallback({"catalog":!allIsData.isCatalog})
        setAllIsData({...allIsData,
        isCatalog:!allIsData.isCatalog,
        isDownloadApp:false,
        isSemuaKategori:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isRandomCategory:false,
        category_random:''
    })
    }
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
                    onChange={open_product}
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
                             <div key={index} className="category-random-item" onClick={()=>open_random_category(`${val.Category}`)}>
                                <p>{val.Category}</p>
                            </div>
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
        }else if (params === 'BulkOrder'){
            setIsMenuHoverBulkOrder(true)
        }else if(params === 'OrderList'){
            setIsMenuHoverOrderList(true)
        }else if (params === 'Login'){
            setIsMenuHoverLogin(true)
            setToggleLogin(true)
        }else if (params === 'allCategory'){
            setisMenuHoverAllCategory(true)
            setToggleAllCategory(true)
        }

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
    }
    const onMouseLeave=()=>{
        setToggleCart(false)
        setToggleLogin(false)
        setToggleAllCategory(false)

        setIsMenuHoverCart(false)
        setIsMenuHoverBulkOrder(false)
        setIsMenuHoverOrderList(false)
        setIsMenuHoverLogin(false)
    }

    const toggleCartFunc=()=>{
        setToggleCart(!toggleCart)
    }
    const renderProductCart=()=>{

        if(cartFromRedux){
            return cartFromRedux.map((val,index)=>{
                var total_cart = cartFromRedux.length
                var item_weight = parseFloat(val.weight_kg)
                var total_weight = (item_weight * parseInt(val.quantity)).toFixed(2)
                var total_price = parseInt(val.quantity) * (parseInt(val.normal_price))
                return (
                    <div  key={index+1} className="render-item-list-cart">
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
                    </div>
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
        console.log(Category)
        console.log(subcategory)
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
    return(
        
        <>
            <div className={headerHome ? 'header-container' : 'header-container-fixed' }>
                <div className="header-top">
                    <div className="header-download-app" onClick={open_download_app}>
                        <BsPhone className="icon-hp-download"/>
                        <p>Download Sold App</p>
                    </div>
                    <div className="header-top-option">
                        <div className="option-top-header-box" onClick={open_aboutus}>
                            <p>About Us</p>
                        </div>
                        <div className="option-top-header-box" onClick={open_kebijakan}>
                            <p>Kebijakan</p>
                        </div>
                        <div className="option-top-header-box" onClick={open_panduan_customer}>
                            <p>Panduan Customer</p>
                        </div>
                        <div className="option-top-header-box" onClick={open_panduan_seller}>
                            <p>Panduan Seller</p>
                        </div>
                        <div className="option-top-header-box" onClick={open_social_media}>
                            <p>Our Social Media</p>
                        </div>
                        <div className="option-top-header-box" onClick={open_catalog}>
                            <p>Out Catalog</p>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <Link to='/' className="box-logo-header">
                        <img src={logo_soldays} alt="" />
                    </Link>
                    <div className="all-category-header-box">
                        
                        <Dropdown
                            onMouseOver={()=>onMouseEnter('allCategory')}
                            onMouseLeave={onMouseLeave}
                            isOpen={toggleAllCategory}
                            onClick={open_cart}
                            >
                            <DropdownToggle caret>
                                <p onClick={open_semua_kategori}>Semua  Kategori</p>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-toggle-allcategory">
                                {/* <Tabs defaultActiveKey="detail" id="uncontrolled-tab-example" className="mb-3">
                                
                                </Tabs> */}
                            
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
                            <div className={isMenuHoverOrderList? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'} onClick={open_order_list}>
                                <img src={logo_unpaid_list} alt="" />
                                <p>Order List</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <div className={isMenuHoverBulkOrder ? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'}onClick={open_bulk_order}>
                                <img src={logo_qr_scan} alt="" />
                                <p>Bulk Order</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <Dropdown
                                onMouseOver={()=>onMouseEnter('Cart')}
                                onMouseLeave={onMouseLeave}
                                isOpen={toggleCart}
                                onClick={open_cart}
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
                                    cartFromRedux ? 
                                        <div className="dropdown-item-list-cart">
                                            <div className="dropdown-item-keranjang-list-cart">
                                                <p>Keranjang ({totalCartRedux})</p>
                                                <p>Lihat Sekarang</p>
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
                                    // className="d-inline-block"
                                    onMouseOver={()=>onMouseEnter('Login')}
                                    onMouseLeave={onMouseLeave}
                                    isOpen={toggleLogin}
                                    // onClick={open_cart}
                                    // toggle={toggleCartFunc}
                                    >
                                    <DropdownToggle caret>   
                                        <div className={isMenuHoverLogin? 'box-active-item-menu box-active-is-active' : 'box-active-item-menu'}onClick={open_logout}>
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

