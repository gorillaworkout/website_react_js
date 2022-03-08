import React, { useState } from 'react'
import '../../Styles/Orderlist.scss'
import Header from '../../Pages/Header/Header'
import { Tabs, Tab, Row, Nav } from "react-bootstrap";
import {BsTruck} from 'react-icons/bs'
import {GrCommand} from 'react-icons/gr'
import sealant from '../../Assets/tokped_gambar/sealant.png'
import {Link} from 'react-router-dom'
import Empty from '../../Assets/tokped_gambar/cart-kosong.jpeg'
export default function Orderlist(){


    const [totalOrder,setTotalOrder]=useState(2)
    return (
        <>
            <div className="container-orderlist">
                <div className="header-orderlist">
                    <Header/>
                </div>
                <div className="main-container-orderlist">
                    <div className="main-box-orderlist">
                        <div className="top-box-orderlist">
                            <Tab.Container defaultActiveKey={1}>
                                <Nav variant="pills" className="flex-column title-orderlist">       
                                    <Nav.Item>
                                        <Nav.Link eventKey="1" href="#">SEMUA</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="2">BELUM BAYAR</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="3" >DIKEMAS</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="4" >DIKIRIM</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="5" >SELESAI</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey={1} title={'Category'}>
                                        {
                                            totalOrder > 0 ?
                                            <>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <Link to={'/detail-pembelian/1231231232'} className="detail-btn">
                                                                Lihat detail pesanan
                                                            </Link>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>       
                                            </>
                                            :
                                            <>
                                                <div className="box-empty-ol">
                                                    <img src={Empty} alt="" />
                                                    <p>Orderlist Kosong, Silahkan belanja dulu</p>
                                                </div>
                                            </>
                                        }
                                    </Tab.Pane>
                                    
                                    <Tab.Pane eventKey={2} title={'Category'}>
                                        {
                                            totalOrder > 0 ?
                                            <>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <Link to={'/detail-pembelian/1231231232'} className="detail-btn">
                                                                Lihat detail pesanan
                                                            </Link>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>       
                                            </>
                                            :
                                            <>
                                                <div className="box-empty-ol">
                                                    <img src={Empty} alt="" />
                                                    <p>Orderlist Kosong, Silahkan belanja dulu</p>
                                                </div>
                                            </>
                                        }
                                       
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3} title={'Category'}>
                                    {
                                            totalOrder > 0 ?
                                            <>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <Link to={'/detail-pembelian/1231231232'} className="detail-btn">
                                                                Lihat detail pesanan
                                                            </Link>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="box-orderlist">
                                                    <div className="top-ol">
                                                        <div className="title-toko">
                                                            <GrCommand className="icon-company"/>
                                                            <p>VANTSING INTERNATIONAL</p>
                                                        </div>
                                                        <div className="status-order-box">
                                                            <p>
                                                                <BsTruck className="icon-truck"/>
                                                                COMPLETED    
                                                            </p>
                                                            <p> | </p>
                                                            <p>SELESAI</p>
                                                        </div>
                                                    </div>
                                                    <div className="mid-ol-detail">
                                                        <div className="box-img-detail">
                                                            <img src={sealant} alt="" />
                                                        </div>
                                                        <p>SEALANT HITAM 300 ML PALING MURAH BANGET <br /> 1x</p>
                                                        <p>RP 30.000</p>
                                                    </div>
                                                    <div className="bottom-ol-detail">
                                                        <div className="bottom-left">

                                                        </div>
                                                        <div className="bottom-right">
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                            <div className="detail-btn">
                                                                Lihat detail pesanan
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>       
                                            </>
                                            :
                                            <>
                                                <div className="box-empty-ol">
                                                    <img src={Empty} alt="" />
                                                    <p>Orderlist Kosong, Silahkan belanja dulu</p>
                                                </div>
                                            </>
                                        }
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}