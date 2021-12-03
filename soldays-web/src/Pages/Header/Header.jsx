import React, { Component } from 'react'
import './Header.css'
import {BsPhone,BsSearch} from 'react-icons/bs'
import {logo_soldays,logo_login,logo_qr_scan,logo_shopping_cart,logo_unpaid_list} from '../../Assets/Assets'
export default function Header(){

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
                            <div className="input-product-searching">
                                <input type="text"className="input-product-header" />
                                <BsSearch className="icon-searching-product"/>
                            </div>
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
                            <img src={logo_unpaid_list} alt="" />
                            <p>Order List</p>
                        </div>
                        <div className="item-menu-1">
                            <img src={logo_qr_scan} alt="" />
                            <p>Bulk Order</p>
                        </div>
                        <div className="item-menu-1">
                            <img src={logo_shopping_cart} alt="" />
                            <p>Cart</p>
                        </div>
                        <div className="item-menu-1">
                            <img src={logo_login} alt="" />
                            <p>Login</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

