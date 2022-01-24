import React, { useEffect,useState } from 'react';
import '../../Styles/Category.scss'
import Header from '../Header/Header';
import Footer from '../../Component/Footer/Footer';
import Gopay from '../../Assets/tokped_gambar/gopay-icon.png'
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import { FullPageLoading } from '../../Component/Loading/Loading';
import {Link} from 'react-router-dom'
export default function Category(){

    const Product = useSelector(state=>state.Product)
    console.log(Product)
    const [allCategory,setAllCategory]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        if(Product.isLoadingProduct === !true){
            fetchingAllCategory()
        }
    },[Product.isLoadingProduct, Product.allSubcategory])

    useEffect(()=>{
        if(allCategory !== undefined){
            setIsLoading(false)
        }else {
            setIsLoading(true)
        }
    },[allCategory])

    const fetchingAllCategory=()=>{
         var allCat = Product.allSubCategory
         setAllCategory(allCat)
         console.log(allCat)
    }

    const renderAllCategory=()=>{

        return allCategory.map((val,index)=>{
            console.log(val)
            return (
                <>
                    <Link to={`/Subcategory/${val[0].allSubcategory[0].Subcategory}`} className="smallcard-category">
                        <div className="img-category">
                            <img src={val[0].allSubcategory[0].Picture_1} alt="" />
                        </div>
                        <p>{val[0].Category}</p>
                    </Link> 
                </>
            )
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
            <div className="container-allcategory">
                <div className="box-main-header">
                    <Header/>
                </div>
                <div className="box-main-category">
                    <div className="box-container-detail">
                        <p>ALL CATEGORY</p>
                    </div> 
                    <div className="box-card-category">
                      {renderAllCategory()}
           
                    </div>
                </div>
                <div className="box-main-footer">
                    <Footer/>
                </div>
            </div>
        </>
    )
}