import React, { useState,useEffect } from 'react';
import '../../Styles/Cart.scss'
import Header from '../Header/Header';
import gambarTest from '../../Assets/tokped_gambar/gopay-icon.png'

import Form from 'react-bootstrap/Form'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {RiCoupon2Line} from 'react-icons/ri'
import Iframe from 'react-iframe';
import ImgEffect from '../../Component/Effect/img_effect';

export default function Cart(){

    const [isLoading,setIsLoading]=useState(true)
    const [allCart,setAllCart]=useState(undefined)


    useEffect(()=>{

        var allCartFromStorage = JSON.parse(localStorage.getItem('itemsInCart'))
        if(allCart === undefined){
            if(allCartFromStorage !== null){
                setAllCart(allCartFromStorage)
                setIsLoading(false)
            }else {
                setAllCart(undefined)
            }
        }else {
            setAllCart(allCartFromStorage)
            setIsLoading(false)
        }
        console.log(allCart)
    },[])

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

    const renderCart=()=>{
        console.log('function jalan render Cart')
        console.log(allCart)
        if(allCart.length > 1){

        }else {
            return (
                <>
                    <div className="cart-item-detail">
                        <Form.Check  key={1} type="checkbox" label={`Sealant Hitam 300ml`}  className="checkbox-allproduct" />
                        <div className="detail-item">
                            <div className="img-box-detail">
                                <ImgEffect
                                    data={{
                                        img:allCart[0].img,
                                        background:'transparent'
                                    }}
                                />
                            </div>
                            <p>{allCart[0].product_name}</p>
                            <div className="box-list">
                                <ul>
                                    <li>Rp{commafy(allCart[0].normal_price)}</li>
                                    <li>
                                        <div className="box-plus-minus-qty">
                                            <div className="box-minus">
                                                <AiOutlineMinus className="icon-plus-minus"/>
                                            </div>
                                            <input type="number" className="box-qty" defaultValue={allCart[0].quantity}/>
                                            <div className="box-plus">  
                                                <AiOutlinePlus className="icon-plus-minus"/>
                                            </div>
                                        </div>
                                    </li>
                                    <li>Rp{commafy(allCart[0].normal_price)}</li>
                                    <li>Aksi</li>
                                </ul>
                            </div> 
                        </div>
                    </div>
                </>
            )
        }
    }


    if(isLoading){
        return (
            <>
                <p>LOADING</p>
            </>
        )
    }

    return (
        <>
            <div className="container-cart">
                <div className="box-header">
                    <Header/>
                </div>
                <div className="box-main-container">
                    <div className="box-iklan-container">
                        <p>Semakin banyak anda berbelanja, Semoga Gaji saya ditambah</p>
                    </div>
                    <div className="box-btn-all">
                        <Form.Check  key={1} type="checkbox" label={`Product`}  className="checkbox-allproduct" />

                        <div className="box-list">
                            <ul>
                                <li>Harga Satuan</li>
                                <li>Kuantitas</li>
                                <li>Total Harga</li>
                                <li>Aksi</li>
                            </ul>
                        </div> 
                    </div>
                    <div className="box-list-cart">
                        {renderCart()}
                    </div>
                    <div className="total-price-cart" >
                        <div className="voucher-box">
                            <div className="voucher-part">
                                <p>
                                    <RiCoupon2Line className="icon-coupon"/>
                                    <span>Voucher Soldays</span>
                                </p>
                                <p>Gunakan/Masukkan Kode</p>
                            </div>
                        </div>
                        <div className="price-box">
                            <Form.Check  key={1} type="checkbox" label={`Pilih Semua(13)`}  className="checkbox-allproduct" />
                            <div className="checkout-box-container">
                                <p>Total(1 Product) :
                                     <span> Rp.30.000.000</span>
                                </p>
                                <div className="btn-checkout">
                                    Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        
        </>
    )
}