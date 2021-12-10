import React, { Component } from 'react'
import './ProductDetail.css'
import Header from '../Header/Header'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export default function ProductDetail(){

    return (
        <>
            <div className="box-container-product-detail">
                <Header/>
                <div className="header-slider-product-detail ">
                    <div className="product-name-slider-box ">
                        <p>COPPER EXTRA BASS SERIES EARPHONE HEADSET BANGET BANGETAN</p>
                    </div>
                    <div className="box-option-product-slider">
                        <div className="box-option-1 slider-active-product-detail">
                            <p>Info Product</p>
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
            </div>
        </>
    )
}