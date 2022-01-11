import React, { useState, useEffect } from 'react'
import './Product.css'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'


export default function Product(){


    return (
        <>
            <div className="box-container-product">
                <Header/>
                <div className="box-render-card-product">
                    <SliderImg/>
                </div>
            </div>
        </>
        
    )
}