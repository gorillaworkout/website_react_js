import React, { useState,useEffect, } from 'react'
import './highlight.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImgEffect from '../Effect/img_effect'
export default function Highlight(data){


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
        return allSubCategoryFromHome.map((val,index)=>{
            return(
                <>
                    <div key={index} className="card-highlight-product" onClick={()=>open_highlight(`${val.Subcategory}`)}>
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
        })
    }
    return (
        <>
            <div className="highlight-container">
                {/* <div className="inside-highlight"> */}
                    <div className="highlight-judul">
                        <h1>HIGHLIGHT</h1>
                    </div>
                    <div className="box-for-product-item-highlight">
                       {render_subcategory_highlight()}       
                    </div>
                {/* </div> */}
            </div>

        </>
    )
}