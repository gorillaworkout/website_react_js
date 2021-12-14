import React, { useState,useEffect, } from 'react'
import './Header.css'
import { css,  } from '@emotion/react'

import {BsPhone,BsSearch} from 'react-icons/bs'
import {AiOutlineLogout,AiOutlineLogin} from 'react-icons/ai'
import {logo_soldays,logo_login,logo_qr_scan,logo_shopping_cart,logo_unpaid_list} from '../../Assets/Assets'
import Select from 'react-select'
import {useDispatch,useSelector} from 'react-redux'



export default function Header(data){
    const Product = useSelector(state=>state.Product)
    // const [isRandomCategory,setIsRandomCategory]=useState(false)
    // const [category_random,setCategory_random]=useState('')
    const [dataSearching,setDataSearching]=useState([])
    const [allProductFromHome,setAllProductFromHome]=useState(Product.allProduct)
    const [allCategoryFromHome,setAllCategoryFromHome]=useState(Product.allCategory)

    const [allIsData,setAllIsData]=useState(
        {
            isLogin:false,
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
  
    const options_product_searching = []
    
    
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

    })
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
        console.log(allCategoryFromHome)
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

    return(
        <>
            <div className="header-container">
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
                    <div className="box-logo-header">
                        <img src={logo_soldays} alt="" />
                    </div>
                    <div className="all-category-header-box">
                        <p onClick={open_semua_kategori}>Semua  Kategori</p>
                    </div>
                    <div className="box-searching-product-header">
                        <div className="input-box-searching">
                            {/* <div className="input-product-searching"> */}
                                {render_searching_product()}
                                {/* <input type="text"className="input-product-header" />
                                <BsSearch className="icon-searching-product"/> */}
                            {/* </div>/ */}
                        </div>
                        <div className="category-random-box">
                                {render_random_category()}
                        </div>
                    </div>
                    <div className="menu-from-header">
                        <div className="item-menu-1">
                            <div className="box-active-item-menu" onClick={open_order_list}>
                                <img src={logo_unpaid_list} alt="" />
                                <p>Order List</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <div className="box-active-item-menu" onClick={open_bulk_order}>
                                <img src={logo_qr_scan} alt="" />
                                <p>Bulk Order</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <div className="box-active-item-menu">
                                <div className="box-cart-counter" onClick={open_cart}>
                                    <img src={logo_shopping_cart} alt=""  id="img-cart-counter"/>
                                    <p id="cart-counter">0</p>
                                </div>
                                    <p>Cart</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            {
                                allIsData.isLogin ?      
                                <div className="box-active-item-menu" onClick={open_logout}>
                                    <AiOutlineLogout className="icon-login-logout"/>
                                    <p>Logout</p>
                                </div>
                            :
                                <div className="box-active-item-menu" onClick={open_login}>
                                    <AiOutlineLogin className="icon-login-logout"/>
                                    <p>Login</p>
                                </div>
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

