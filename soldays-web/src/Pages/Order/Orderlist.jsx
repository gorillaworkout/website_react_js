import React, { Component } from 'react'
import '../../Styles/Orderlist.scss'
import Header from '../../Pages/Header/Header'
import { Tabs, Tab, Row, Nav } from "react-bootstrap";

export default function Orderlist(){

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
                                        <div className="box-orderlist">
                                            
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2} title={'Category'}>
                                       
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3} title={'Category'}>
                                        
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