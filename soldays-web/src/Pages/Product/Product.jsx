import React, { useState, useEffect } from 'react'
import './Product.css'
import '../../Styles/Product.scss'
import Header from '../Header/Header'
import SliderImg from '../../Component/Slider/Slider'
import ProductCard from '../../Component/ProductCard/ProductCard'
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import { FullPageLoading } from '../../Component/Loading/Loading'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import CardItem from '../../Component/card/CardItem'
import Select from 'react-select'
import { css,  } from '@emotion/react'
import Form from 'react-bootstrap/Form'
import Footer from '../../Component/Footer/Footer'
import ImgEffect from '../../Component/Effect/img_effect'

export default function Product(){

    const { Subcategory } = useParams();
    const Product = useSelector(state=>state.Product)
    const [allProductRender,setAllProductRender]=useState(undefined)
    const [allSubcategory,setAllSubcategory]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [dataCardProduct,setDataCardProduct]=useState({})
    const [dataSearching,setDataSearching]=useState([])
    const [optionSearching,setOptionSearching]=useState([])
    const [isFilterMurah,setIsFilterMurah]=useState(false)
    const [isFilterMahal,setIsFilterMahal]=useState(false)
    const [checkedMurah,setCheckedMurah]=useState(false)
    const [checkedMahal,setCheckedMahal]=useState(false)
    const [ArrayFilterSubcategory,setArrayFilterSubcategory]=useState(undefined)
    const [listSubcategoryActive,setListSubcategoryActive]=useState(undefined)
    
    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            fetchingAllProduct()
            // fetchingListSubcategory()
        }
    },[Product.allProduct, Product.isLoadingProduct, Subcategory])



    const fetchingAllProduct=()=>{
        setListSubcategoryActive([Subcategory])
        var allProductRedux = Product.allProduct
        var allSubCategoryRedux = Product.allSubCategory
        var allListSubcategory = [Subcategory]
        console.log(allListSubcategory)
        const allProductFilter = []
        const options_product_searching = []
        console.log(allListSubcategory,' all list category')
        setAllProductRender(Product.allProduct)
        setAllSubcategory(allSubCategoryRedux)
        setIsLoading(false)
        
        // if(allListSubcategory.length > 1 ){ // fetching  kalo list yg mau di render lebih dari 1
        //     allListSubcategory.map((value,id,arr)=>{

        //     })
        // }else {
        //     setListSubcategoryActive(allListSubcategory)
        // }

        // batas

        // const filter= allProductRedux.filter((val,index,array)=>{
        //     if(allListSubcategory.length > 1 ){ // fetching  kalo list yg mau di render lebih dari 1
        //         allListSubcategory.map((value,id,arr)=>{
    
        //         })
        //     }else {
        //         if(val.Subcategory.toUpperCase() === allListSubcategory[0].toUpperCase()){
        //             allProductFilter.push(val)
        //             options_product_searching.push({
        //                 value:val,
        //                 label:val.Name
        //             })
        //         }
        //     }

        //     if(index === array.length -1 ){
        //         setAllProductRender(allProductFilter)
        //         setAllSubcategory(allSubCategoryRedux)
        //         setDataCardProduct({
        //             isTokpedAds:false,
        //             allProductItem:allProductFilter
        //         })
        //         setOptionSearching(options_product_searching)
        //         // console.log(allProductFilter)
        //         setIsLoading(false)
                
                
        //     }
        // })
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
        
        // 20 january bug terakhir ada di line 119 - 134. filter harus dirubah
        var array_for_render = []
        const filter = allProductRender.filter((val,index)=>{
            
            if(listSubcategoryActive.length > 1 ){
                listSubcategoryActive.map((value,id,index)=>{
                    console.log(value,'JALAAN')
                    array_for_render.push(value)
                })
    
            }else {
                if(val.Subcategory.toUpperCase() === listSubcategoryActive[0].toUpperCase()){
                    console.log('masuk ke else 129s')
                    array_for_render.push(val)
                }
                
            }
        })

       
        console.log(array_for_render,' array for render')
        return array_for_render.map((val,index)=>{
                var hargaAwal = parseInt(val.Sell_Price)
                var discount = parseInt(val.Sell_Price * 0.1)
                var hargaTotal = hargaAwal - discount
                // return (
                //     <>
                //         <CardItem arr={{
                //             Link:`/ProductDetail/${val.Product_Code}`,
                //             Img:val.Picture_1,
                //             Name:val.Name,
                //             HargaAwal:hargaAwal,
                //             HargaTotal:hargaTotal,
                //             funcBuyNow:()=>addToCartProduct(val.Product_Code,1,val.PIC_company_address,val.Weight_KG,val.Name)
                //         }}/>
                //     </>
                // )
            
            
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
        // if(allProductRender.length === undefined) {
        //     var hargaAwal = parseInt(allProductRender.Sell_Price)
        //     var discount = parseInt(allProductRender.Sell_Price * 0.1)
        //     var hargaTotal = hargaAwal - discount
        //     return (
        //         <>
        //             <CardItem arr={{
        //                 Link:`/ProductDetail/${allProductRender.Product_Code}`,
        //                 Img:allProductRender.Picture_1,
        //                 Name:allProductRender.Name,
        //                 HargaAwal:hargaAwal,
        //                 HargaTotal:hargaTotal,
        //                 funcBuyNow:()=>addToCartProduct(allProductRender.Product_Code,1,allProductRender.PIC_company_address,allProductRender.Weight_KG,allProductRender.Name)
        //             }}/>
        //         </>
        //     )
        // }else {
        //     return allProductRender.map((val,index)=>{
        //         var hargaAwal = parseInt(val.Sell_Price)
        //         var discount = parseInt(val.Sell_Price * 0.1)
        //         var hargaTotal = hargaAwal - discount
        //         return (
        //             <>
        //                 <CardItem arr={{
        //                     Link:`/ProductDetail/${val.Product_Code}`,
        //                     Img:val.Picture_1,
        //                     Name:val.Name,
        //                     HargaAwal:hargaAwal,
        //                     HargaTotal:hargaTotal,
        //                     funcBuyNow:()=>addToCartProduct(val.Product_Code,1,val.PIC_company_address,val.Weight_KG,val.Name)
        //                 }}/>
        //             </>
        //         )
        //     })

        // }
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
    const handleCheckBoxSubcategory=(params)=>{
        var allListItem = listSubcategoryActive
        if(allListItem.length > 1){
            allListItem.forEach((val,index)=>{
                if(params.toUpperCase() !== val.toUpperCase()){
                    allListItem.push(params)
                        var finalList = [] 
                        allListItem.forEach((item)=>{
                        if(!finalList.includes(item)){
                            finalList.push(item)
                        }
                    })
                    setListSubcategoryActive(finalList)
                }else if (params.toUpperCase()=== val.toUpperCase()){
                    var finalList = []
                    allListItem.forEach((item)=>{
                        if(!finalList.includes(item)){
                            finalList.push(item)
                        }
                    })
                    finalList.splice(index,1)
                    setListSubcategoryActive(finalList)
                }
            })
        }else {
            allListItem.push(params)
            setListSubcategoryActive(allListItem)
            console.log(allListItem)
        }




       

        // const filter = allProductRedux.filter((val,index,array)=>{
        //     if(val.Subcategory.toUpperCase() === params.toUpperCase()){
        //         console.log(val)
        //         allProductFilter.push(val)
        //         options_product_searching.push({
        //             value:val,
        //             label:val.Name
        //         })
        //     }
        //     if(index === array.length -1 ){
        //         setAllProductRender(allProductFilter)
        //         setDataCardProduct({
        //             isTokpedAds:false,
        //             allProductItem:allProductFilter
        //         })
        //         setOptionSearching(options_product_searching)
        //     }
        // })

        // var allArray = ArrayFilterSubcategory
        // allArray.push(params)
        // setArrayFilterSubcategory(allArray)
    }

    const renderSubCategory=()=>{
        // console.log(allSubcategory)
        return allSubcategory.map((val,index)=>{
            // console.log(val[0].allSubcategory)
            var array_val = val[0].allSubcategory
            if(val[0].allSubcategory.length > 1){
                return val[0].allSubcategory.map((val,index)=>{
                    if(val.Subcategory.toUpperCase() === Subcategory.toUpperCase()){

                    }else{
                        return (
                            <Form.Check  type="checkbox" label={`${val.Subcategory}`} onChange={()=>handleCheckBoxSubcategory(val.Subcategory)} />
                        )
                    }
                })
            }else {      
                if(val[0].allSubcategory[0].Subcategory.toUpperCase() === Subcategory.toUpperCase()){

                }else {
                    return (
                        <>
                           <Form.Check  type="checkbox" label={`${val[0].allSubcategory[0].Subcategory}`} onChange={()=>handleCheckBoxSubcategory(val[0].allSubcategory[0].Subcategory)} /> 
                        </>
                    )
                }
            }
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
                                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                                    Category
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
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
                                    {/* {renderSearchingCard()} */}
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