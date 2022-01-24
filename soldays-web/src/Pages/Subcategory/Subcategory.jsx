import React, { useState, useEffect } from 'react'
import '../../Styles/Subcategory.scss'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
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
    const [allProductRender,setAllProductRender]=useState(undefined) // array Fetching isinya All Product from Redux
    const [arrayForRender,setArrayForRender]=useState(undefined)
    const [allSubcategory,setAllSubcategory]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [optionSearching,setOptionSearching]=useState([]) 
    const [checkedMurah,setCheckedMurah]=useState(false)
    const [checkedMahal,setCheckedMahal]=useState(false)
    const [listSubcategoryActive,setListSubcategoryActive]=useState(undefined)
    
    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            fetchingAllProduct()
        }
    },[Product.allProduct, Product.isLoadingProduct, Subcategory])

    
    const fetchingAllProduct=()=>{
        setListSubcategoryActive([Subcategory])
        // var allProductRedux = Product.allProduct
        var allSubCategoryRedux = Product.allSubCategory
        setAllProductRender(Product.allProduct)
        setAllSubcategory(allSubCategoryRedux)
        setIsLoading(false)
        fetchingProductForRender([Subcategory])
    }

    useEffect(()=>{
        if(allProductRender !== undefined){
            setIsLoading(false)
        }else {
            setIsLoading(true)
        }
    },[allProductRender])


    const addToCartProduct=(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)=>{
        console.log(Product_Code,Total_Qty,Company_Address,Product_Weight,Product_Name)

    }

    const fetchingProductForRender=(array)=>{
        var allProduct = allProductRender
        var options_product_searching=[]
        if(allProduct === undefined){
            allProduct = Product.allProduct
        }

        var new_array_for_render = []
        if(array.length > 1 ){
            array.forEach((val,id,arr)=>{
               allProductRender.forEach((value,index,array)=>{
                    if(value.Subcategory.toUpperCase() === val.toUpperCase()){
                        new_array_for_render.push(value)
                        options_product_searching.push({
                            value:value,
                            label:value.Name
                        })
                    }
                })
                if(id === arr.length - 1){
                    if(checkedMurah){
                         new_array_for_render = filterByLower(new_array_for_render)
                    }else if (checkedMahal){
                        new_array_for_render = filterByBigger(new_array_for_render)
                    }
                }
            })
        }else {
            allProduct.forEach((val,index)=>{
                if(val.Subcategory.toUpperCase() === array[0].toUpperCase()){
                    new_array_for_render.push(val)
                    options_product_searching.push({
                        value:val,
                        label:val.Name
                    })
                }
            })
        }
        setArrayForRender(new_array_for_render)
        setOptionSearching(options_product_searching)
    }

    const RenderCard=()=>{
       if(arrayForRender.length > 1 ){
           return arrayForRender.map((val,index)=>{      
               var hargaAwal = parseInt(val.Sell_Price)
               var discount = parseInt(val.Sell_Price * 0.1)
               var hargaTotal = hargaAwal - discount
               return (
                   <>
                       <CardItem key={index+1} arr={{
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
       }else {
            var hargaAwal = parseInt(arrayForRender[0].Sell_Price)
            var discount = parseInt(arrayForRender[0].Sell_Price * 0.1)
            var hargaTotal = hargaAwal - discount
            return (
                <>
                    <CardItem key={1} arr={{
                        Link:`/ProductDetail/${arrayForRender[0].Product_Code}`,
                        Img:arrayForRender[0].Picture_1,
                        Name:arrayForRender[0].Name,
                        HargaAwal:hargaAwal,
                        HargaTotal:hargaTotal,
                        funcBuyNow:()=>addToCartProduct(arrayForRender[0].Product_Code,1,arrayForRender[0].PIC_company_address,arrayForRender[0].Weight_KG,arrayForRender[0].Name)
                    }}/>
                </>
            )
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
            setArrayForRender(e.value)
        }
    }

    const filterByLower=(array)=>{

        if(array === undefined ){
            var asc = arrayForRender.sort((a,b)=>{
                var harga_a = parseInt(a.Sell_Price)
                var harga_b = parseInt(b.Sell_Price)
                if(harga_a === harga_b ){
                    return harga_a - harga_b
                }else {
                    return harga_a - harga_b
                }
            })
            setArrayForRender(asc)
        }else {
            var asc = array.sort((a,b)=>{
                var harga_a = parseInt(a.Sell_Price)
                var harga_b = parseInt(b.Sell_Price)
                if(harga_a === harga_b ){
                    return harga_a - harga_b
                }else {
                    return harga_a - harga_b
                }
            })
            setArrayForRender(asc)
        }
        return asc
    }

    const filterByBigger=(array)=>{

        if(array === undefined ){
            var desc = arrayForRender.sort((a,b)=>{
            var harga_a = parseInt(a.Sell_Price)
            var harga_b = parseInt(b.Sell_Price)
                if(harga_a === harga_b ){
                    return harga_b - harga_a
                }else {
                    return harga_b - harga_a
                }
            }) 
            setArrayForRender(desc)
        }else {
            var desc = array.sort((a,b)=>{
                var harga_a = parseInt(a.Sell_Price)
                var harga_b = parseInt(b.Sell_Price)
                    if(harga_a === harga_b ){
                        return harga_b - harga_a
                    }else {
                        return harga_b - harga_a
                    }
                })
                setArrayForRender(desc) 
        }
        return desc
    }

    const handleClickCheckBox=(params)=>{
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
        }
    }
    const handleCheckBoxSubcategory=(params)=>{
        var allListItem = listSubcategoryActive
        var findIndex = allListItem.findIndex((val)=>{
            return val.toUpperCase() === params.toUpperCase()
        })
        if(findIndex === -1){
            allListItem.push(params)
            fetchingProductForRender(allListItem)
        }else {
            allListItem.splice(findIndex,1)
            fetchingProductForRender(allListItem) 
        }
    }

    const renderSubCategory=()=>{
        return allSubcategory.map((val,index)=>{
            if(val[0].allSubcategory.length > 1){
                return val[0].allSubcategory.map((val,index)=>{
                    if(val.Subcategory.toUpperCase() === Subcategory.toUpperCase()){
                        return (
                            <>

                            </>
                        )
                    }else{
                        return (
                            <Form.Check  key={index+1} type="checkbox" label={`${val.Subcategory}`} onChange={()=>handleCheckBoxSubcategory(val.Subcategory)} />
                        )
                    }
                })
            }else {      
                if(val[0].allSubcategory[0].Subcategory.toUpperCase() === Subcategory.toUpperCase()){
                    return (
                        <>
                        </>
                    )
                }else {
                    return (
                        <>
                           <Form.Check  key={index+1} type="checkbox" label={`${val[0].allSubcategory[0].Subcategory}`} onChange={()=>handleCheckBoxSubcategory(val[0].allSubcategory[0].Subcategory)} /> 
                        </>
                    )
                }
            }
        })
    }


    if(isLoading){
        return (
            <>
                <div key={2020} className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
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
                                <Breadcrumb.Item href="/allcategory">
                                    Category
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="#">
                                    SubCategory
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
                                <div className="price-part">
                                    <p>SubCategory</p>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        {renderSubCategory()}
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