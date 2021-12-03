import React, { Component,useState,useEffect,useCallback } from 'react'
import './Header.css'
import { css, jsx } from '@emotion/react'

import {BsPhone,BsSearch} from 'react-icons/bs'
import {AiOutlineLogout,AiOutlineLogin} from 'react-icons/ai'
import {logo_soldays,logo_login,logo_qr_scan,logo_shopping_cart,logo_unpaid_list} from '../../Assets/Assets'
import Select from 'react-select'



export default function Header(data){

    const [isLogin,setIsLogin]=useState(data.data.isLogin)
    const [allProductFromHome,setAllProductFromHome]=useState(data.data.allProduct)
    const options_product_searching = []

    // console.log(handleCallbackFromHeader)
    
    useEffect(()=>{
        // console.log(allProductFromHome)
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

    })
    const open_product=(e)=>{
        var nama_product = e
        if(nama_product === null){

        }else {
            // console.log('jalan',e.value)
            // console.log(data.parentCallback(e.value))
            data.parentCallback(e.value)
        }
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

    return(
        <>
            <div className="header-container">
                <div className="header-top">
                    <div className="header-download-app">
                        <BsPhone className="icon-hp-download"/>
                        <p>Download Sold App</p>
                    </div>
                    <div className="header-top-option">
                        <div className="option-top-header-box">
                            <p>About Us</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Kebijakan</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Panduan Customer</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Panduan Seller</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Our Social Media</p>
                        </div>
                        <div className="option-top-header-box">
                            <p>Out Catalog</p>
                        </div>
                    </div>
                </div>
                <div className="header-bottom">
                    <div className="box-logo-header">
                        <img src={logo_soldays} alt="" />
                    </div>
                    <div className="all-category-header-box">
                        <p>Semua  Kategori</p>
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
                            <div className="category-random-item">
                                <p>ADHESIVE</p>
                            </div>
                            <div className="category-random-item">
                                <p>KIPAS ANGIN HALU</p>
                            </div>
                            <div className="category-random-item">
                                <p>REDUX FOR LIFE</p>
                            </div>
                            <div className="category-random-item">
                                <p>KUCING GORENG CABAI</p>
                            </div>
                            <div className="category-random-item">
                                <p>ADHESIVE</p>
                            </div>
                        </div>
                    </div>
                    <div className="menu-from-header">
                        <div className="item-menu-1">
                            <div className="box-active-item-menu">
                                <img src={logo_unpaid_list} alt="" />
                                <p>Order List</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <div className="box-active-item-menu">
                                <img src={logo_qr_scan} alt="" />
                                <p>Bulk Order</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            <div className="box-active-item-menu">
                                <div className="box-cart-counter">
                                    <img src={logo_shopping_cart} alt=""  id="img-cart-counter"/>
                                    <p id="cart-counter">0</p>
                                </div>
                                    <p>Cart</p>
                            </div>
                        </div>
                        <div className="item-menu-1">
                            {
                                isLogin ?      
                                <div className="box-active-item-menu">
                                    <AiOutlineLogout className="icon-login-logout"/>
                                    <p>Logout</p>
                                </div>
                            :
                                <div className="box-active-item-menu">
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

