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
import {GetAllProduct,getAllSubCategory} from '../../redux/Actions/ProductActions'
import {FullPageLoading} from '../../Component/Loading/Loading'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {useDispatch,useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom';



export default function Home({parentCallback}){
    const dispatch=useDispatch()
    const Product = useSelector(state=>state.Product)
    const Auth = useSelector(state=>state.Auth)
    const location = useLocation();

    const [allProductItem,setAllProductItem]=useState(Product.allProduct)
    const [allProductGroupbuy,setAllProductGroupbuy]=useState(Product.allCategoryGroupBuy)
    const [allProductNew,setAllProductNew]=useState(Product.allCategoryNew)
    const [allCategory,setAllCategory]=useState(Product.AllCategory)
    const [allSubCategory,setAllSubCategory]=useState(Product.allSubCategory)
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

    
    // STATE YANG DIKIRIM UNTUK SETIAP CHILD
        const [dataToHighlight,setDataToHighlight]=useState({
            allSubCategory:Product.allSubCategory
        })
        const [dataToCardPromo,setDataToCardPromo]=useState({
            isTokpedAds:true,
            allProductItem: Product.allCategoryGroupBuy
        })
        const [dataToCardNew,setDataToCardNew]=useState({
            isTokpedAds:false,
            allProductItem: Product.allCategoryNew
        })
        const [dataToCardAds1,setDataToCardAds1]=useState({
            detail_Cards:'PROMO',
            img:ads_panjang_1,
            icon:icon_ads_panjang_brand,
            bayu:'dari promo'
        })
        const [dataToCardAds2,setDataToCardAds2]=useState({
            detail_Cards:'NEW',
            img:ads_panjang_2,
            icon:icon_ads_panjang_new,
            bayu:'dari new'
        })
      

        const check_all_data=()=>{
            var isDataToHeader    = false
            var isDataToHighlight = false
            var isDataToCardPromo = false
            var isDataToCardNew   = false
            var isDataToCardAds1  = false
            var isDataToCardAds2  = false
            if(dataToHighlight.allSubCategory !== undefined){
                if(dataToHighlight.allSubCategory.length > 0){
                    // console.log('data dah ada isinya')
                    // console.log(Product.allSubCategory)
                    setDataToHighlight({...dataToHighlight,allSubCategory:Product.allSubCategory})
                    isDataToHighlight = true
                    // setLoadingFetchingData(false)
                }else {
                    console.log('data to highlight kosong')
                }
            }else {
                console.log('data undefined')
            }
            if(dataToCardPromo.allProductItem !== undefined){
                if(dataToCardPromo.allProductItem.length > 0){
                    // console.log('data dah ada isinya')
                    setDataToCardPromo({...dataToCardPromo,allProductItem:Product.allCategoryGroupBuy})
                    isDataToCardPromo = true
                }else {
                    console.log('data to highlight kosong')
                }
            }else {
                console.log('data undefined')
            }
            if(dataToCardNew.allProductItem !== undefined){
                if(dataToCardNew.allProductItem.length > 0){
                    // console.log('data dah ada isinya')
                    setDataToCardNew({...dataToCardNew,allProductItem:Product.allCategoryNew})
                    isDataToCardNew = true
                }else {
                    console.log('data to highlight kosong')
                }
            }else {
                console.log('data undefined')
            }
            if(dataToCardAds1 !== undefined){
                // if(dataToCardAds1.length > 0){
                    // console.log('data dah ada isinya')
                    setDataToCardAds1({...dataToCardAds1})
                    isDataToCardAds1 = true
                // }else {
                    // console.log(dataToCardAds1.length)
                    // console.log('data to highlight kosong')
                // }
            }else {
                console.log('data undefined')
            }
            if(dataToCardAds2 !== undefined){
                // if(dataToCardAds1.length > 0){
                    // console.log('data dah ada isinya')
                    setDataToCardAds2({...dataToCardAds2})
                    isDataToCardAds2 = true
                // }else {
                    // console.log(dataToCardAds1.length)
                    // console.log('data to highlight kosong')
                // }
            }else {
                console.log('data undefined')
            }

            if(isDataToHighlight && isDataToCardPromo && isDataToCardNew && isDataToCardAds1 && isDataToCardAds2 ){
                setLoadingFetchingData(false)
            }else {
                dispatch(GetAllProduct())
            }
            

        }


        useEffect(()=>{
            check_all_data()
            
        },[])
        console.log(dataToHighlight)
    // STATE YANG DIKIRIM UNTUK SETIAP CHILD END
   

    useEffect(()=>{
        setAllProductItem(Product.allProduct)
        setAllProductGroupbuy(Product.allCategoryGroupBuy)
        setAllProductNew(Product.AllCategoryNew)
        setAllCategory(Product.AllCategory)
        setAllSubCategory(Product.allSubCategory)
        // setLoadingFetchingData(Product.isLoadingProduct)
  
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
        // allProduct:allProductItem,
        // allCategory:allCategory
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
           {/* <h1>header</h1> */}
            <Header  parentCallback={handleCallbackFromHeader}/>
            <LazyLoad>
                <div className="box-highlight">
                    <Highlight data={dataToHighlight} parentCallback={handleCallbackFromHighlight}/>
                </div>
            </LazyLoad>

            <LazyLoad>
                <CardAds data={dataToCardAds1}/>
            </LazyLoad>

            <LazyLoad>
                <ProductCard data={dataToCardPromo} parentCallback={handleCallbackFromCardPromo}/>
            </LazyLoad>

            <LazyLoad>
                <CardAds data={dataToCardAds2} />
            </LazyLoad>

            <LazyLoad>
                <ProductCard data={dataToCardNew} parentCallback={handleCallbackFromCardNew}/>
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