import React, {useEffect,useState} from 'react'

import './home.css'
import Header from '../Header/Header'
import Highlight from '../../Component/Highlight/highlight'
import CardAds from '../../Component/card/Card_Ads'
import ProductCard from '../../Component/ProductCard/ProductCard'
import Footer from '../../Component/Footer/Footer'
import axios from 'axios'
import LazyLoad from 'react-lazyload';
import ImgEffect from '../../Component/Effect/img_effect'
import { ads_panjang_1,icon_ads_panjang_brand,icon_ads_panjang_new,ads_panjang_2 } from '../../Assets/Assets';
// import Loader from "react-loader-spinner";

import {FullPageLoading} from '../../Component/Loading/Loading'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useDispatch,useSelector} from 'react-redux'



export default function Home({parentCallback}){
    const Product = useSelector(state=>state.Product)
    const Auth = useSelector(state=>state.Auth)
    // console.log(Auth)
    console.log(Product)
    const [allProductItem,setAllProductItem]=useState(Product.allProduct)
    const [allProductGroupbuy,setAllProductGroupbuy]=useState(Product.allCategoryGroupBuy)
    const [allProductNew,setAllProductNew]=useState(Product.allCategoryNew)
    const [allCategory,setAllCategory]=useState(Product.AllCategory)
    const [allSubCategory,setAllSubCategory]=useState(Product.allSubCategory)
    const [loadingFetchingData,setLoadingFetchingData]=useState(Product.isLoading)
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
   
    
    // console.log(Product)
    // console.log(Auth)

    useEffect(()=>{
        setAllProductItem(Product.allProduct)
        setAllProductGroupbuy(Product.allCategoryGroupBuy)
        setAllProductNew(Product.AllCategoryNew)
        setAllCategory(Product.AllCategory)
        setAllSubCategory(Product.allSubCategory)
        setLoadingFetchingData(Product.isLoadingProduct)
  
    },
    [Product.isLoadingProduct, Product.AllCategory, Product.AllCategoryNew, Product.allCategoryGroupBuy, Product.allProduct, Product.allSubCategory, allProductItem])
    




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
    console.log(data_to_card_promo)
    var data_to_card_new={
        isTokpedAds:false,
        allProductItem: allProductNew
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
    // FUNCTION FOR HEADER
    if(loadingFetchingData){
        return (
            <>
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                    {FullPageLoading(loadingFetchingData,100,'#0095DA')}
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

            <LazyLoad>
                <ProductCard data={data_to_card_promo} parentCallback={handleCallbackFromCardPromo}/>
            </LazyLoad>

            <LazyLoad>
                <CardAds data={data_to_cards_ads_2} />
            </LazyLoad>

            <LazyLoad>
                <ProductCard data={data_to_card_new} parentCallback={handleCallbackFromCardNew}/>
            </LazyLoad>



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
                <div className="box-highlight2">
                    <LazyLoad>
                            <Footer/>
                    </LazyLoad>
                </div>

        </div>
        </>
    )
}