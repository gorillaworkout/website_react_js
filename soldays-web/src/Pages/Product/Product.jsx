import React, { useState, useEffect } from 'react'
import './Product.css'
import '../../Styles/Product.scss'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { useParams } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import { FullPageLoading } from '../../Component/Loading/Loading'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CardItem from '../../Component/card/CardItem'
import Select from 'react-select'
import { css,  } from '@emotion/react'
import Form from 'react-bootstrap/Form'
import Footer from '../../Component/Footer/Footer'


export default function Product(){

    const { Subcategory } = useParams();
    const Product = useSelector(state=>state.Product)
    const [allProductRender,setAllProductRender]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [dataCardProduct,setDataCardProduct]=useState({})
    const [dataSearching,setDataSearching]=useState([])
    const [optionSearching,setOptionSearching]=useState([])
    const [isFilterMurah,setIsFilterMurah]=useState(false)
    const [isFilterMahal,setIsFilterMahal]=useState(false)
    const [checkedMurah,setCheckedMurah]=useState(false)
    const [checkedMahal,setCheckedMahal]=useState(false)
    
    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            fetchingAllProduct()
        }
    },[Product.allProduct, Product.isLoadingProduct, Subcategory])

    const fetchingAllProduct=()=>{
        var allProductRedux = Product.allProduct
        const allProductFilter = []
        const options_product_searching = []

        const filter= allProductRedux.filter((val,index,array)=>{
            if(val.Subcategory.toUpperCase() === Subcategory.toUpperCase()){
                allProductFilter.push(val)
                options_product_searching.push({
                    value:val,
                    label:val.Name
                })
                // console.log(options_product_searching)
            }
            if(index === array.length -1 ){
                setAllProductRender(allProductFilter)
                setDataCardProduct({
                    isTokpedAds:false,
                    allProductItem:allProductFilter
                })
                setOptionSearching(options_product_searching)
                // console.log(allProductFilter)
                setIsLoading(false)
            }
        })
    }

    useEffect(()=>{
        if(allProductRender !== undefined){
            // console.log(allProductRender,'product undefined')
            setIsLoading(false)
        }else {
            // console.log(allProductRender,'masuk ke else')
            setIsLoading(true)
        }
    },[allProductRender])


    const addToCartProduct=(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)=>{
        console.log(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)

    }


    const RenderCard=()=>{
        // console.log(allProductRender.length,allProductRender)
        if(allProductRender.length === undefined) {
            var hargaAwal = parseInt(allProductRender.Sell_Price)
            var discount = parseInt(allProductRender.Sell_Price * 0.1)
            var hargaTotal = hargaAwal - discount
            return (
                <>
                    <CardItem arr={{
                        Link:`/ProductDetail/${allProductRender.Product_Code}`,
                        Img:allProductRender.Picture_1,
                        Name:allProductRender.Name,
                        HargaAwal:hargaAwal,
                        HargaTotal:hargaTotal,
                        funcBuyNow:()=>addToCartProduct(allProductRender.Product_Code,1,allProductRender.PIC_company_address,allProductRender.Weight_KG,allProductRender.Name)
                    }}/>
                </>
            )
        }else {
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
    }

    const renderSearchingCard=()=>{
        return (
            <>
                <Select 
                css={css`
                    width：100% !important;
                `}
                    isClearable={true}
                    // value={currentValueProduct}
                    backspaceRemovesValue={true}
                    onChange={open_product}
                    options={optionSearching}
                    placeholder="Cari Barangmu disini"
                />
            </>
        )
    }
    const open_product=(e)=>{
        var nama_product = e
        if(nama_product === null){
            fetchingAllProduct()
        }else {
            setAllProductRender(e.value)
            setDataSearching(e.value)
            console.log(e.value)
            // data.parentCallback({"searching_header":e.value})
        }
    }

    const filterByLower=()=>{
        var asc = allProductRender.sort((a,b)=>{
            var harga_a = parseInt(a.Sell_Price)
            var harga_b = parseInt(b.Sell_Price)
            console.log(harga_a,'ini a')
            console.log(harga_b,'ini b')
            if(harga_a === harga_b ){
                console.log('msk ke if')
                return harga_a - harga_b
            }else {
                console.log('msk ke else')
                return harga_a - harga_b
            }
        })
        console.log(asc)
        setAllProductRender(asc)
    }
    const filterByBigger=()=>{
        var desc = allProductRender.sort((a,b)=>{
            var harga_a = parseInt(a.Sell_Price)
            var harga_b = parseInt(b.Sell_Price)
            if(harga_a === harga_b ){
                return harga_b - harga_a
            }else {
                return harga_b - harga_a
            }
        })
        setAllProductRender(desc)
        console.log(desc)
    }

    const handleClickCheckBox=(params)=>{
        console.log(params)
        if(params === 'murah'){
            filterByLower()
            if(checkedMurah){
                setCheckedMurah(false)
                setCheckedMahal(false)
            }else {
                setCheckedMurah(true)
                setCheckedMahal(false)
            }

        }else if ( params === 'mahal'){
            filterByBigger()
            if(checkedMahal){
                setCheckedMahal(false)
                setCheckedMurah(false)
            }else{
                setCheckedMahal(true)
                setCheckedMurah(false)
            }
            // setCheckedMahal(!checkedMahal)

        }
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
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Kategori Utama
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    SubKategori
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>{Subcategory}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                    <div className="body-product-box">
                        <div className="product-left-box">
                            <div className="box-filter-product">
                                <div className="filter-part">
                                    <p>Filter</p>
                                </div>
                                <div className="category-part">
                                    <p>Cari di Kategori ini</p>
                                    {renderSearchingCard()}
                                </div>
                                <div className="price-part">
                                    <p>Harga</p>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check checked={checkedMurah} type="checkbox" label="Harga Termurah" onChange={()=>handleClickCheckBox('murah')} />
                                        <Form.Check checked={checkedMahal} type="checkbox" label="Harga Termahal" onChange={()=>handleClickCheckBox('mahal')}/>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="product-right-box">
                            <div className="box-product-filter">
                                {RenderCard()}
                            </div>       
                        </div>
                    </div>
                    <div className="box-footer">
                        <Footer/>
                    </div>
                </div>
                
            </div>
        </>
        
    )
}