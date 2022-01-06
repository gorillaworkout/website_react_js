import React, { useState } from 'react'
import './highlight.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImgEffect from '../Effect/img_effect'
    export default function Highlight(data){
    console.log(data.data.allSubCategory)
    // console.log(data.data.allSubCategory[0][0].Category)

    const [allSubCategoryFromHome,setAllSubCategpryFromHome]=useState(data.data.allSubCategory)
    const [open_Category,setOpen_Category] = useState(false)
    const open_highlight=(subcategory)=>{
    
        var data_to_home = [
            {"open_subcategory":!open_Category},
            {"subcategory_from_highlight":subcategory}
        ]
            
        
        data.parentCallback(data_to_home)
    }
    const render_subcategory_highlight=()=>{
        if(allSubCategoryFromHome.length > 1){
            return allSubCategoryFromHome.map((val,index)=>{
                console.log(val)
                if(val[0].allSubcategory.length >1 ){
                    return val[0].allSubcategory.map((val,index)=>{
                        console.log(val.Subcategory)
                        return (
                            <div key={index+1} className="card-highlight-product" onClick={()=>open_highlight(`${val.Subcategory}`)}>
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
                            </div>
                        )
                    })
                }else {
                    return(
                        <>
                         <div key={index+1} className="card-highlight-product" onClick={()=>open_highlight(`${val.Subcategory}`)}>
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
                        </div>
                        </>
                    )
    
                }
            })
        }else {
            return(
                <>
                 <div key={1} className="card-highlight-product" onClick={()=>open_highlight(`${allSubCategoryFromHome.Subcategory}`)}>
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
                </div>
                </>
            )
        }
    }
    return (
        <>
            <div key={12} className="highlight-container">
                {/* <div className="inside-highlight"> */}
                    <div className="highlight-judul">
                        <h1>HIGHLIGHT</h1>
                    </div>
                    <div className="box-for-product-item-highlight" key={1}>
                       {render_subcategory_highlight()}       
                    </div>
                {/* </div> */}
            </div>

        </>
    )
}