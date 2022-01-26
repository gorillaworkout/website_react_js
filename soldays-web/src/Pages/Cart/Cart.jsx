import React, { Component } from 'react';
import '../../Styles/Cart.scss'
import Header from '../Header/Header';
import gambarTest from '../../Assets/tokped_gambar/gopay-icon.png'

import Form from 'react-bootstrap/Form'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'


export default function Cart(){


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
                        <div className="cart-item-detail">
                            <Form.Check  key={1} type="checkbox" label={`Sealant Hitam 300ml`}  className="checkbox-allproduct" />
                            <div className="detail-item">
                                <img src={gambarTest} alt="" />
                                <p>Sealant 300 Ml DEWA BANGET LAH POKOKNYA</p>
                                <div className="box-list">
                                    <ul>
                                        <li>Rp.30.000</li>
                                        <li>
                                            <div className="box-plus-minus-qty">
                                                <div className="box-minus">
                                                    <AiOutlineMinus className="icon-plus-minus"/>
                                                </div>
                                                <input type="number" className="box-qty" />
                                                <div className="box-plus">  
                                                    <AiOutlinePlus className="icon-plus-minus"/>
                                                </div>
                                            </div>
                                        </li>
                                        <li>RP.30.000</li>
                                        <li>Aksi</li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div className="total-price-cart">

                    </div>

                </div>
            </div>  
        
        </>
    )
}