import React, {useEffect,useState} from 'react'

import './home.css'
import Header from '../Header/Header'
import Highlight from '../../Component/Highlight/highlight'
import axios from 'axios'


export default function Home({parentCallback}){
    const [allProductItem,setAllProductItem]=useState([])
    const [allCategory,setAllCategory]=useState([])
    const [loadingFetchingData,setLoadingFetchingData]=useState(true)
    const [callbackFromHeader,setCallbackFromHeader]=useState([])
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
    console.log(callbackFromHeader,'call back from header')
    useEffect(()=>{
        var all_product = JSON.parse(localStorage.getItem('all_product'))
        var all_category = JSON.parse(localStorage.getItem('all_category'))
        if(all_product === null || all_product === ''){
            axios.post('https://products.sold.co.id/get-product-details')
            .then((res)=>{
                setAllProductItem(res.data)
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_product',stringify_all_product)
                setLoadingFetchingData(false)
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            setAllProductItem(all_product)
            setLoadingFetchingData(false)
        }

        if(all_category === null || all_product === ''){
            axios.post(`https://products.sold.co.id/get-product-details?Get_ALL_Category=true`)
            .then((res)=>{
                console.log(res.data)
                setAllCategory(res.data)
                var stringify_all_product = JSON.stringify(res.data)
                localStorage.setItem('all_category',stringify_all_product)
                setLoadingFetchingData(false)
            }).catch((err)=>{
                console.log(err)
            })
        }else {
            setAllCategory(all_category)
            setLoadingFetchingData(false)
        }
    },[])




    // FUNCTION FOR HEADER
    const handleCallbackFromHeader=(childData)=>{
        setCallbackFromHeader(childData)
        // setAllIsDataFromHeader()
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
            <Highlight/>

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