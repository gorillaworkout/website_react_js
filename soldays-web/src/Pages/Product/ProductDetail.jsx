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
import {IoIosArrowDropup} from 'react-icons/io'
import {FaCommentAlt} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import {BsFillShareFill} from 'react-icons/bs'
// import ImgEffect from '../../Component/Effect/img_effect';
import ImgEffect from '../../Component/Effect/img_effect'

export default function ProductDetail(){


    // const [width, height] = useWindowSize({ fps: 60 });
    // const [widthD, heightD] = useWindowSizeD();
    const scrollY = useScrollPosition(60 /*frames per second*/);
    const [scrollZero,setScrollZero] = useState(true)
    const [scrollNone,setScrollNone] = useState(true)
    useEffect(()=>{
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



    },[scrollY, scrollZero])

    // testing scroll
    const bottomRef = useRef();
    // const reachedBottom = useCustomHooks(bottomRef);
    // testing scroll

    const onInputQtyProduct=(qty)=>{
        console.log(parseInt(qty))
    }
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
                    {/* <section className="box-detail-product-img"> */}
                    <section className={scrollNone ? 'box-detail-product-img img-appeared' : 'box-detail-product-img img-hide'}>
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
                                                            <img src={Vantsing_logo} alt="" />
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
                        <div className="section-input-item">
                            <div className="section-varian-top">
                                <p>Pilih Varian</p>
                                <IoIosArrowDropup className="icon-arrow-up"/>
                            </div>

                            <div className="section-pilih-item-box">
                                <p>Quantity : 1pcs</p>
                                <input type="number" className="input-pcs-product" onChange={(e)=>onInputQtyProduct(e.target.value)} />
                            </div>
                            <div className="section-pilih-item-box2">
                                <p className="total_harga nonactive-icon">Total Harga dan quantity</p>
                                <IoIosArrowDropup className="icon-arrow-up nonactive-icon"/>
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

                <div className="ulasan-product-detail" ref={bottomRef}>
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