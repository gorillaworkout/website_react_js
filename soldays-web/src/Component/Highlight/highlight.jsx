import React, { useState,useEffect } from 'react'
// import './highlight.css'
import '../../Styles/Highlight.scss'
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImgEffect from '../Effect/img_effect'
import {Link} from 'react-router-dom'

    export default function Highlight(data){
    // console.log(data.data.allSubCategory)
    // console.log(data.data.allSubCategory[0][0].Category)

    const [allSubCategoryFromHome,setAllSubCategpryFromHome]=useState(data.data.allSubCategory)
    // const [open_Category,setOpen_Category] = useState(false)

    useEffect(()=>{
        if(allSubCategoryFromHome !== undefined) {
            setAllSubCategpryFromHome(data.data.allSubCategory)
        }
    },[allSubCategoryFromHome, data.data.allSubCategory])
    const open_highlight=(subcategory)=>{
    
        // var data_to_home = [
        //     {"open_subcategory":!open_Category},
        //     {"subcategory_from_highlight":subcategory}
        // ]
            
        
        // data.parentCallback(data_to_home)
    }
    const render_subcategory_highlight=()=>{
        if(allSubCategoryFromHome.length > 1){
            return allSubCategoryFromHome.map((val,index)=>{
                // console.log(val)
                if(val[0].allSubcategory.length >1 ){
                    return val[0].allSubcategory.map((val,index)=>{
                        // console.log(val.Subcategory)
                        return (
                            <Link to={`/Product/${val.Subcategory}`} style={{textDecoration:'none'}} key={index+1} className="card-highlight-product" onClick={()=>open_highlight(`${val.Subcategory}`)}>
                                <div className="card-highlight-img">
                                    <ImgEffect
                                        data={{
                                            img:val.Picture_1,
                                            background:'#ccc'
                                        }}
                                    />
                                </div>
                                <div className="card-detail-name">
                                    <p>{val.Subcategory}</p>
                                </div>
                            </Link>
                        )
                    })
                }else {
                    console.log(val[0].allSubcategory[0].Picture_1)
                    return(
                        <>
                         <Link to={`/Product/${val[0].allSubcategory[0].Subcategory}`} style={{textDecoration:'none'}} key={index+1} className="card-highlight-product" onClick={()=>open_highlight(`${val[0].allSubcategory[0].Subcategory}`)}>
                            <div className="card-highlight-img">
                                <ImgEffect
                                    data={{
                                        img:val[0].allSubcategory[0].Picture_1,
                                        background:'#ccc'
                                    }}
                                />
                            </div>
                            <div className="card-detail-name">
                                <p>{val[0].allSubcategory[0].Subcategory}</p>
                            </div>
                        </Link>
                        </>
                    )
    
                }
            })
        }else {
            return(
                <>
                 <Link to={`/Product/${allSubCategoryFromHome.Subcategory}`} style={{textDecoration:'none'}} key={1} className="card-highlight-product" onClick={()=>open_highlight(`${allSubCategoryFromHome.Subcategory}`)}>
                    <div className="card-highlight-img">
                        <ImgEffect
                            data={{
                                img:allSubCategoryFromHome.Picture_1,
                                background:'#ccc'
                            }}
                        />
                    </div>
                    <div className="card-detail-name">
                        <p>{allSubCategoryFromHome.Subcategory}</p>
                    </div>
                </Link>
                </>
            )
        }
    }
    return (
        <>
            <div key={12} className="highlight-container">
                <div className="highlight-judul">
                    <h1>HIGHLIGHT</h1>
                </div>
                <div className="box-for-product-item-highlight" key={1}>
                    {render_subcategory_highlight()}       
                </div>
            </div>

        </>
    )
}