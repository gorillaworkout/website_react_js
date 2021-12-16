import React, { useState } from 'react'
import './ProductDetail.css'
import Header from '../Header/Header'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

// import { useWindowSize } from "@react-hook/window-size/throttled";
// import { useWindowSize as useWindowSizeD } from "@react-hook/window-size/";
import useScrollPosition from "@react-hook/window-scroll";
import { useEffect } from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import {GrLocation} from 'react-icons/gr'
import Sealant from '../../Assets/tokped_gambar/sealant.png'
export default function ProductDetail(){


    // const [width, height] = useWindowSize({ fps: 60 });
    // const [widthD, heightD] = useWindowSizeD();
    const scrollY = useScrollPosition(60 /*frames per second*/);
    const [scrollZero,setScrollZero] = useState(true)
    useEffect(()=>{
        // console.log(scrollY)
        if(scrollY === 0 ){
            setScrollZero(true)
        }else {
            setScrollZero(false)
        }

        var testing = document.querySelector('.ulasan-product-detail').pageYOffset
        console.log(testing)
    },[scrollY, scrollZero])
    return (
        <>
            <div className="box-container-product-detail">
                <Header/>
                {/* <div className="header-slider-product-detail "> */}
                <div className={scrollZero ? "header-slider-product-detail" : "header-slider-product-detail active-box-slider" }>
                    <div className="product-name-slider-box ">
                        <p>COPPER EXTRA BASS SERIES EARPHONE HEADSET BANGET BANGETAN</p>
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
                        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                            Library
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Data</Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div className="detail-product-box ">
                    <section className="box-detail-product-img">
                        <div className="box-img-pd">
                                <img src={Sealant} alt="" />
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
                            <p>MACBOOK PRO 2012 RAM 16 GB SSD 512 M1 BARU JAKARTA BARAT SELATAN TIMUR</p>
                        </div>
                        <div className="description-price-pd">
                            <p>RP 22.000.000</p>
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
                                                        <span className="main-li-box"> Laptop Consumer</span>
                                                    </li>   
                                                    <li className="li-box-description">
                                                        <span>Sub Kategori : </span>
                                                        <span className="main-li-box"> Laptop</span>
                                                    </li>       
                                                </ul>
                                                <div className="main-description-detail-product">
                                                    <p>
                                                        Barang Di Jamin Baru / NEW 100%
                                                        BNIB Segel BLACKPEEL Unit Dan Aksesoris
                                                        Garansi Official Apple 1 Tahun (Kita Bantu Klaim Garansi Free)
                                                        Garansi Tukar Unit Baru Jika Produk Cacat Fungsi (7x 24Jam)
                                                        *HARUS ADA VIDEO UNBOXING*
                                                    </p>
                                                    <p>
                                                        Barang Di Jamin Baru / NEW 100%
                                                        BNIB Segel BLACKPEEL Unit Dan Aksesoris
                                                        Garansi Official Apple 1 Tahun (Kita Bantu Klaim Garansi Free)
                                                        Garansi Tukar Unit Baru Jika Produk Cacat Fungsi (7x 24Jam)
                                                        *HARUS ADA VIDEO UNBOXING*
                                                    </p>
                                                </div>
                                                <div className="company-description-box">
                                                    <div className="img-box-company-description">
                                                        <div className="img-company-description">

                                                        </div>
                                                    </div>
                                                    <div className="company-description-detail">
                                                        <p>VANTSING INTERNATIONAL </p>
                                                        <p>
                                                            <GrLocation/> <span>Pengiriman Dari Jakarta</span>
                                                        </p>
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

                    </section>
                </div>

                <div className="ulasan-product-detail">
                    
                </div>

            </div>
        </>
    )
}