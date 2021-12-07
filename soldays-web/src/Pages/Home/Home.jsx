import React, {useEffect,useState} from 'react'

import './home.css'
import Header from '../Header/Header'
import Highlight from '../../Component/Highlight/highlight'
import CardAds from '../../Component/card/Card_Ads'
import ProductCard from '../../Component/ProductCard/ProductCard'
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import { ads_panjang_1,icon_ads_panjang_brand,icon_ads_panjang_new,ads_panjang_2,ads_panjang_3 } from '../../Assets/Assets';
// import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default function Home({parentCallback}){
    const [allProductItem,setAllProductItem]=useState([])
    const [allProductGroupbuy,setAllProductGroupbuy]=useState([])
    const [allProductNew,setAllProductNew]=useState([])
    const [allCategory,setAllCategory]=useState([])
    const [allSubCategory,setAllSubCategory]=useState([])
    const [loadingFetchingData,setLoadingFetchingData]=useState(true)
    const [callbackFromHeader,setCallbackFromHeader]=useState([])
    const [callbackFromHighlight,setCallbackFromHighlight]=useState([])
    const [callbackFromCardPromo,setCallbackFromCardPromo]=useState([])
    const [callbackFromCardNew,setCallbackFromCardNew]=useState([])
    const [allIsDataFromHeader,setAllIsDataFromHeader]=useState({
        isLogin:false,
        isSemuaKategori:false,
        isOrderList:false,
        isBulkOrder:false,
        isCart:false,
        isAboutUs:false,
        isKebijakan:false,
        isPanduanSeller:false,
        isPanduanCustomer:false,
        isSocialMedia:false,
        isCatalog:false,
        isDownloadApp:false,
        isRandomCategory:false,
        category_random:''
    })
    // console.log(callbackFromHeader,'call back from header')
    // console.log(callbackFromHighlight,'call back from highlight')
    useEffect(()=>{
        var all_product = JSON.parse(localStorage.getItem('all_product'))
        var all_category = JSON.parse(localStorage.getItem('all_category'))
        var all_subcategory = JSON.parse(localStorage.getItem('all_subcategory'))
        var all_array_groupbuy = []
        var all_array_new = []
        if(all_product === null || all_product === ''){
            axios.post('https://products.sold.co.id/get-product-details')
            .then((res)=>{
                setAllProductItem(res.data)
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_product',stringify_all_product)
                res.data.forEach((val,index)=>{
                    if(val.GroupBuy_Purchase === true || val.GroupBuy_Purchase === 'true'){
                        all_array_groupbuy.push(val)
                        setAllProductGroupbuy(all_array_groupbuy)
                    }
                    if (val.Categorize_NEW === true || val.Categorize_NEW === 'true') {
                        all_array_new.push(val)
                        setAllProductNew(all_array_new)
                    }
                })
                setLoadingFetchingData(false)
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            all_product.forEach((val,index)=>{
                if(val.GroupBuy_Purchase === true || val.GroupBuy_Purchase === 'true'){
                    all_array_groupbuy.push(val)
                    setAllProductGroupbuy(all_array_groupbuy)
                }
                if (val.Categorize_NEW === true || val.Categorize_NEW === 'true') {
                    all_array_new.push(val)
                    setAllProductNew(all_array_new)
                }
            })
            setAllProductItem(all_product)
            setLoadingFetchingData(false)
        }

        // GET ALL CATEGORY
        if((all_category === null || all_product === '') && (all_subcategory === null || allSubCategory === '') ){ 
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
            .then((res)=>{
                console.log(res.data)
                setAllCategory(res.data)
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_category',stringify_all_product)

                // GET ALL SUBCATEGORY
                var all_array_subcategory = []
                    res.data.forEach((val,index)=>{
                        axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Sub_Category_Based_On_Category=${val.Category}`)
                        .then((res)=>{
                            if(res.data.length > 0){
                                res.data.forEach((val,index)=>{
                                    all_array_subcategory.push(val)
                                })
                            }else {
                                all_array_subcategory.push(res.data)
                            }
                            var stringify_subcategory = JSON.stringify(all_array_subcategory)
                            localStorage.setItem('all_subcategory',stringify_subcategory)
                            setAllSubCategory(all_array_subcategory)
                            setLoadingFetchingData(false)
                        }).catch((err)=>{
                            console.log(err)
                        })
                    })
                // GET ALL SUBCATEGORY
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            setAllCategory(all_category)
            setAllSubCategory(all_subcategory)
            setLoadingFetchingData(false)
        }
        // GET ALL CATEGORY


    },[])




    // FUNCTION FOR HEADER
    const handleCallbackFromHeader=(childData)=>{
        setCallbackFromHeader(childData)
        // setAllIsDataFromHeader()
    }
    const handleCallbackFromHighlight=(childData)=>{
        setCallbackFromHighlight(childData)
    }

    const handleCallbackFromCardPromo=(childData)=>{
        setCallbackFromCardPromo(childData)
    }

    const handleCallbackFromCardNew=(childData)=>{
        setCallbackFromCardNew(childData)
    }
    var data_to_header = {
        isLogin:allIsDataFromHeader.isLogin,
        isOrderList:allIsDataFromHeader.isOrderList,
        isBulkOrder:allIsDataFromHeader.isBulkOrder,
        isCart:allIsDataFromHeader.isCart,
        isSemuaKategori:allIsDataFromHeader.isSemuaKategori,
        isRandomCategory:allIsDataFromHeader.isRandomCategory,
        isDownloadApp:allIsDataFromHeader.isDownloadApp,
        isAboutUs:allIsDataFromHeader.isAboutUs,
        isKebijakan:allIsDataFromHeader.isKebijakan,
        isPanduanCustomer:allIsDataFromHeader.isPanduanCustomer,
        isPanduanSeller:allIsDataFromHeader.isPanduanSeller,
        isSocialMedia:allIsDataFromHeader.isSocialMedia,
        isCatalog:allIsDataFromHeader.isCatalog,
        allProduct:allProductItem,
        allCategory:allCategory
    }
    var data_to_highlight = {
        allSubCategory:allSubCategory
    }
    var data_to_card_promo = {
        isTokpedAds:true,
        allProductItem: allProductGroupbuy
    }
    var data_to_card_new={
        isTokpedAds:false,
        allProductItem: allProductGroupbuy
    }
    var data_to_cards_ads_1={
        detail_Cards:'PROMO',
        img:ads_panjang_1,
        icon:icon_ads_panjang_brand
    }
    var data_to_cards_ads_2 ={
        detail_Cards:'NEW',
        img:ads_panjang_2,
        icon:icon_ads_panjang_new
    }
    console.log(data_to_card_promo)

    // FUNCTION FOR HEADER
    if(loadingFetchingData){
        return (
            <>
                <div>
                    <p>LOADING</p>
                </div>
            </>
        )
    }
    return (
        <>
        <div className="home-container">
           
            <Header data={data_to_header} parentCallback={handleCallbackFromHeader}/>
            <LazyLoad>
                <div className="box-highlight">
                    <Highlight data={data_to_highlight} parentCallback={handleCallbackFromHighlight}/>
                </div>
            </LazyLoad>
            <LazyLoad>
                <CardAds data={data_to_cards_ads_1}/>
            </LazyLoad>
                <ProductCard data={data_to_card_promo} parentCallback={handleCallbackFromCardPromo}/>
            <LazyLoad>
                <CardAds data={data_to_cards_ads_2} />
            </LazyLoad>
                <ProductCard data={data_to_card_new} parentCallback={handleCallbackFromCardNew}/>



            {
                callbackFromHeader.download_app ? 
                <>
                    <h1>DOWNLOAD APP MUNCUL</h1>
                </>
                :
                <>

                </>
            }
            {
                callbackFromHeader.order_list ?
                <>
                    <h1>ORDER LIST KEBUKA</h1>
                </>
                :
                <>

                </>
            }

        </div>
        </>
    )
}