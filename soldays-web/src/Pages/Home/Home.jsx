import React, {useEffect,useState,useCallback} from 'react'

import './home.css'
import Header from '../Header/Header'
import axios from 'axios'


export default function Home({parentCallback}){
    const [allProductItem,setAllProductItem]=useState([])
    const [loadingFetchingData,setLoadingFetchingData]=useState(true)
    const [callbackFromHeader,setCallbackFromHeader]=useState([])
    console.log(callbackFromHeader)
    useEffect(()=>{
        var all_product = JSON.parse(localStorage.getItem('all_product'))
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
    },[])



    // FUNCTION FOR HEADER
    const handleCallbackFromHeader=(childData)=>{
        setCallbackFromHeader(childData)
    }

    var data_to_header = {
        isLogin:false,
        isOrderList:false,
        isBulkOrder:false,
        isCart:false,
        allProduct:allProductItem
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
            <Header data={data_to_header} parentCallback={handleCallbackFromHeader}/>
            
        </>
    )
}