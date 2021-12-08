import React, {useState } from 'react'
import './ProductCard.css'
import Tokped_gambar from '../../Assets/tokped_gambar/tokped.png'
import Sealant from '../../Assets/tokped_gambar/sealant.png'
import {badge_new,badge_groupbuy,icon_cart} from '../../Assets/Assets'
import {motion} from 'framer-motion/dist/es/index'
import ScrollContainer from 'react-indiana-drag-scroll'

export default function ProductCard(data){

    const [isTokpedAds,setIsTokpedAds]=useState(data.data.isTokpedAds) // ini dibikin kalo misal card mau pake iklan berarti true, kasih class tokped_ads_iklan
    const [allDataFromHome,setAllDataFromHome]=useState(data.data.allProductItem)
    const [imageLoading, setImageLoading] = useState(true);
    const [pulsing, setPulsing] = useState(true);
  
    const imageLoaded = () => {
      setImageLoading(false);
      setTimeout(() => setPulsing(false), 600);
    };
    function commafy( num ) {
        if(num !==undefined){
            var str = num.toString().split('.');
            if (str[0].length >= 5) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 5) {
                str[1] = str[1].replace(/(\d{3})/g, '$1 ');
            }
            return str.join('.');
        }else {
            return '0'
        }
    }

    console.log(data)
    const renderCard=()=>{

        return allDataFromHome.map((val,index)=>{
            var hargaAwal = parseInt(val.Sell_Price)
            var discount = parseInt(val.Sell_Price * 0.1)
            var hargaTotal = hargaAwal + discount
            if(val.GroupBuy_Purchase === 'true' && isTokpedAds === true){
                return (
                    <>
                        <div key={index+1} className="card-product-box tokped_ads_active  hvr-float-shadow">
                            <div className="box-badge-product-card">
                                <img src={badge_groupbuy} alt="" id="badge_groupbuy"/>
                            </div>
                            <div className="box-img-product-card">
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
                                {/* <img src={val.Picture_1} alt="" /> */}
                            </div>
                            <div className="box-price-buy-product-card ">
                                <div className="inner-price-box-product-card">
                                    <div className="box-top-price-product-card">
                                        <p id="discount-price">RP.{commafy(hargaTotal)}</p>
                                    </div>
                                    <div className="box-top-price-product-card">
                                        <p id="normal-price">RP.{commafy(hargaAwal)}</p>
                                    </div>
                                </div>
                                <div className="inner-buy-box-product-card">
                                    <img src={icon_cart} alt="" />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }else if (val.Categorize_NEW === 'true' && isTokpedAds=== true){
                return (
                    <div key={index+1} className="card-product-box tokped_ads_active hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={badge_new} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
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
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={icon_cart} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }else {
                return (
                    <div key={index+1} className="card-product-box  hvr-float-shadow">
                        <div className="box-badge-product-card">
                            <img src={badge_new} alt="" id="badge_new"/>
                            {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
                            {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
                        </div>
                        <div className="box-img-product-card">
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
                        </div>
                        <div className="box-price-buy-product-card ">
                            <div className="inner-price-box-product-card">
                                <div className="box-top-price-product-card">
                                    <p id="discount-price">RP.30.000</p>
                                </div>
                                <div className="box-top-price-product-card">
                                    <p id="normal-price">RP.20.000</p>
                                </div>
                            </div>
                            <div className="inner-buy-box-product-card">
                                <img src={icon_cart} alt="" />
                            </div>
                        </div>
                    </div>
                )
            }
        })
      
    }

    return (
        <>
            <div className="box-container-product-card">
                <div className="inner-product-card">
                    {
                        isTokpedAds ? 
                        
                        <div className="card-tokped-iklan">
                            <div className="card-half-tokped">
                                {/* <img src={Tokped_gambar} alt="" /> */}

                                <div className={`${pulsing ? "pulse" : ""} loadable`}
                                    style={{ width: "100%", background: "yellow" }}>
                                    <motion.img
                                    initial={{ height: "100%", opacity: 0 }}
                                    // style={{ height: imageLoading ? "6rem" : "auto" }}
                                    animate={{
                                        height: imageLoading ? "100%" : "auto",
                                        opacity: imageLoading ? 0 : 1
                                    }}
                                    transition={
                                        ({ height: { delay: 0, duration: 0.4 } },
                                        { opacity: { delay: 0.5, duration: 0.4 } })
                                    }
                                    onLoad={imageLoaded}
                                    width="100%"
                                    height="100%"
                                    src={Tokped_gambar}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            
                        </>

                    }
                    {/* <ScrollContainer className="scroll-container"> */}
                        {renderCard()}
                    {/* </ScrollContainer> */}
                </div>
            </div>
        </>
    )
}