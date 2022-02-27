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
                            
                        </div>  
                    </div>
                </div>
            </div>
        </>
    )
}