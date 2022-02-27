import React, { Component } from 'react'
import Header from '../Header/Header'
import '../../Styles/DetailOrder.scss'

export default function DetailOrder(){
    


    return (
        <>
            <div className="container-detailorder">
                <div className="header-detailorder">
                    <Header/>
                </div>
                <div className="main-container-detailorder">
                    <div className="main-box-detailorder">
                        <div className="top-box-detailorder">
                            <div className="box-icon">
                                <p>Kembali</p>
                            </div>
                            <div className="box-right-top-detailorder">
                                <p>NO. PESANAN. 12312313</p>
                                <p>|</p>
                                <p>PESANAN PENDING</p>
                            </div>
                        </div> 
                        <div className="mid-box-detailorder">
                            <div className="box-status-detailorder">
                                <div className="box-garis-undefined">

                                </div>
                                <div className="box-tengah">
                                    <div className="box-bulat">
                                        icon
                                    </div>
                                    <p>Pesanan Dibuat</p>
                                </div>
                                <div className="box-garis">

                                </div>
                            </div>   
                            <div className="box-status-detailorder">
                                <div className="box-garis">

                                </div>
                                <div className="box-tengah">
                                    <div className="box-bulat">
                                        icon2
                                    </div>
                                    <p>Pesanan Dibayar</p>
                                </div>
                                <div className="box-garis">

                                </div>
                            </div>  
                            <div className="box-status-detailorder">
                                <div className="box-garis">

                                </div>
                                <div className="box-tengah">
                                    <div className="box-bulat">
                                        icon2
                                    </div>
                                    <p>Pesanan Dikirim</p>
                                </div>
                                <div className="box-garis">

                                </div>
                            </div>   
                            <div className="box-status-detailorder">
                                <div className="box-garis">

                                </div>
                                <div className="box-tengah">
                                    <div className="box-bulat">
                                        icon2
                                    </div>
                                    <p>Pesanan Selesai</p>
                                </div>
                                <div className="box-garis-undefined">

                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>    
        </>
   )
}