import React, { useState, useEffect } from 'react'
import './Product.css'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { FullPageLoading } from '../../Component/Loading/Loading'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CardItem from '../../Component/card/CardItem'
export default function Product(){

    const { Subcategory } = useParams();
    const Product = useSelector(state=>state.Product)
    const [allProductRender,setAllProductRender]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [dataCardProduct,setDataCardProduct]=useState({})
    console.log(Product)

    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            var allProductRedux = Product.allProduct
            const allProductFilter = []

            const filter= allProductRedux.filter((val,index,array)=>{
                if(val.Subcategory.toUpperCase() === Subcategory.toUpperCase()){
                    allProductFilter.push(val)
                }
                if(index === array.length -1 ){
                    setAllProductRender(allProductFilter)
                    setDataCardProduct({
                        isTokpedAds:false,
                        allProductItem:allProductFilter
                    })
                    console.log(allProductFilter)
                    setIsLoading(false)
                }
            })
        }
    },[Product.allProduct, Product.isLoadingProduct, Subcategory])

    useEffect(()=>{
        if(allProductRender !== undefined){
            console.log(allProductRender,'product undefined')
            setIsLoading(false)
        }else {
            console.log(allProductRender,'masuk ke else')
            setIsLoading(true)
        }
    },[allProductRender])


    const addToCartProduct=(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)=>{
        console.log(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)

    }


    const RenderCard=()=>{
        return allProductRender.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal - discount
            return (
                <>
                    <CardItem arr={{
                        Link:`/ProductDetail/${val.Product_Code}`,
                        Img:val.Picture_1,
                        Name:val.Name,
                        HargaAwal:hargaAwal,
                        HargaTotal:hargaTotal,
                        funcBuyNow:()=>addToCartProduct(val.Product_Code,1,val.PIC_company_address,val.Weight_KG,val.Name)
                    }}/>
                </>
            )
        })
    }

    
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
                    <div className="product-breadcrumb">
                        <div className="breadcrumb-box">
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Kategori Utama
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    SubKategori
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>Sealant</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="body-product-box">
                        <div className="product-left-box">
                            <div className="box-filter-product">
                                <div className="filter-part">
                                    <p>Filter</p>
                                </div>
                            </div>
                        </div>
                        <div className="product-right-box">
                            <div className="box-product-filter">
                                {RenderCard()}
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}