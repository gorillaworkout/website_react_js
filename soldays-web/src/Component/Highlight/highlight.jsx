import React, { useState,useEffect, } from 'react'
import './highlight.css'
import LazyLoad from 'react-lazyload';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {motion} from 'framer-motion/dist/es/index'
export default function Highlight(data){


    const [allSubCategoryFromHome,setAllSubCategpryFromHome]=useState(data.data.allSubCategory)
    const [open_Category,setOpen_Category] = useState(false)
    const [imageLoading, setImageLoading] = useState(true);
    const [pulsing, setPulsing] = useState(true);
  
    const imageLoaded = () => {
      setImageLoading(false);
      setTimeout(() => setPulsing(false), 600);
    };
    
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
                            <div className={`${pulsing ? "pulse" : ""} loadable`}
                                    style={{ width: "100%", background: "#ccc" }}>
                                    <motion.img
                                    initial={{ height: "100%", opacity: 0 }}
                                    // style={{ height: imageLoading ? "6rem" : "auto" }}
                                    animate={{
                                        height: imageLoading ? "100%" : "auto",
                                        opacity: imageLoading ? 0 : 1
                                    }}
                                    transition={
                                        ({ height: { delay: 0, duration: 0.4 } },
                                        { opacity: { delay: 0.7, duration: 0.4 } })
                                    }
                                    onLoad={imageLoaded}
                                    width="100%"
                                    height="100%"
                                    src={val.Picture_1}
                                    />
                                </div>
                            {/* <LazyLoadImage
                                alt={val.Subcategory}
                                src={val.Picture_1}
                                
                            /> */}
                            {/* <img src={val.Picture_1} alt="" /> */}
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