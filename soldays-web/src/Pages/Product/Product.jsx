import React, { useState, useEffect } from 'react'
import './Product.css'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { FullPageLoading } from '../../Component/Loading/Loading'



export default function Product(){

    const { Subcategory } = useParams();
    const Product = useSelector(state=>state.Product)
    const [allProductRender,setAllProductRender]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    

    
    if(isLoading){
        return (
            <>
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                    {FullPageLoading(isLoading,100,'#0095DA')}
                </div>
            </>
        )
    }
    return (
        <>
            <div className="box-container-product">
                <div className="header-box">
                    <Header/>
                </div>
                <div className="product-box">
                    <div className="slider-box-product">
                        <SliderImg/>
                    </div>
                    <div className="body-product-box">
                        <div className="product-left-box">
                            <p>Filter</p>
                            <div className="box-filter-product">

                            </div>
                        </div>
                        <div className="product-right-box">
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}