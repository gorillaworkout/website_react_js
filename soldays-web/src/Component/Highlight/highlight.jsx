import React, { Component } from 'react'
import './highlight.css'
import login from '../../Assets/icon_header/login.png'
export default function highlight(){

    return (
        <>
            <div className="highlight-container">
                <div className="highlight-judul">
                    <h1>HIGHLIGHT</h1>
                </div>
                <div className="box-for-product-item-highlight">
                    <div className="card-highlight-product">
                        <div className="card-highlight-img">
                            <img src={login} alt="" />
                        </div>
                        <div className="card-detail-name">
                            <p>LOGIN MAS BRO DISINI</p>
                        </div>
                    </div>
                
                </div>
            </div>

        </>
    )
}