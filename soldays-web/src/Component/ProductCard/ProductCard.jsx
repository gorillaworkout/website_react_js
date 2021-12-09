import React, {useState,useEffect } from 'react'
import './ProductCard.css'
import Tokped_gambar from '../../Assets/tokped_gambar/tokped.png'
import {badge_new,badge_groupbuy,icon_cart,new_iklan_left} from '../../Assets/Assets'
import ImgEffect from '../../Component/Effect/img_effect'

export default function ProductCard(data){
    const [isTokpedAds,setIsTokpedAds]=useState(data.data.isTokpedAds) // ini dibikin kalo misal card mau pake iklan berarti true, kasih class tokped_ads_iklan
    const [allDataFromHome,setAllDataFromHome]=useState(data.data.allProductItem)
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

    useEffect(()=>{
        setAllDataFromHome(data.data.allProductItem)
    },[data.data.allProductItem])
  

    const renderCard=()=>{
        console.log(allDataFromHome)
        // return allDataFromHome.map((val,index)=>{
        //     var hargaAwal = parseInt(val.Sell_Price)
        //     var discount = parseInt(val.Sell_Price * 0.1)
        //     var hargaTotal = hargaAwal + discount
        //     if(val.GroupBuy_Purchase === 'true' && isTokpedAds === true){
        //         return (
        //             <>
        //                 <div key={index+1} className="card-product-box tokped_ads_active  hvr-float-shadow">
        //                     <div className="box-badge-product-card">
        //                         <img src={badge_groupbuy} alt="" id="badge_groupbuy"/>
        //                     </div>
        //                     <div className="box-img-product-card">
        //                         <ImgEffect data={{
        //                             img:val.Picture_1,
        //                             background:'#ccc'
        //                             }}
        //                         />
        //                     </div>
        //                     <div className="box-price-buy-product-card ">
        //                         <div className="inner-price-box-product-card">
        //                             <div className="box-top-price-product-card">
        //                                 <p id="discount-price">RP.{commafy(hargaTotal)}</p>
        //                             </div>
        //                             <div className="box-top-price-product-card">
        //                                 <p id="normal-price">RP.{commafy(hargaAwal)}</p>
        //                             </div>
        //                         </div>
        //                         <div className="inner-buy-box-product-card">
        //                             <img src={icon_cart} alt="" />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </>
        //         )
        //     }else if (val.Categorize_NEW === 'true' && isTokpedAds=== true){
        //         return (
        //             <div key={index+1} className="card-product-box tokped_ads_active hvr-float-shadow">
        //                 <div className="box-badge-product-card">
        //                     <img src={badge_new} alt="" id="badge_new"/>
        //                     {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
        //                     {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
        //                 </div>
        //                 <div className="box-img-product-card">
        //                     <ImgEffect data={{
        //                         img:val.Picture_1,
        //                         background:'#ccc'
        //                         }}
        //                     />
        //                 </div>
        //                 <div className="box-price-buy-product-card ">
        //                     <div className="inner-price-box-product-card">
        //                         <div className="box-top-price-product-card">
        //                             <p id="discount-price">RP.30.000</p>
        //                         </div>
        //                         <div className="box-top-price-product-card">
        //                             <p id="normal-price">RP.20.000</p>
        //                         </div>
        //                     </div>
        //                     <div className="inner-buy-box-product-card">
        //                         <img src={icon_cart} alt="" />
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     }else {
        //         return (
        //             <div key={index+1} className="card-product-box  hvr-float-shadow">
        //                 <div className="box-badge-product-card">
        //                     <img src={badge_new} alt="" id="badge_new"/>
        //                     {/* <img src={badge_seller} alt="" id="badge_seller"/> */}
        //                     {/* <img src={badge_groupbuy} alt="" id="badge_groupbuy"/> */}
        //                 </div>
        //                 <div className="box-img-product-card">
        //                     <ImgEffect data={{
        //                         img:val.Picture_1,
        //                         background:'#ccc'
        //                         }}
        //                     />
        //                 </div>
        //                 <div className="box-price-buy-product-card ">
        //                     <div className="inner-price-box-product-card">
        //                         <div className="box-top-price-product-card">
        //                             <p id="discount-price">RP.30.000</p>
        //                         </div>
        //                         <div className="box-top-price-product-card">
        //                             <p id="normal-price">RP.20.000</p>
        //                         </div>
        //                     </div>
        //                     <div className="inner-buy-box-product-card">
        //                         <img src={icon_cart} alt="" />
        //                     </div>
        //                 </div>
        //             </div>
        //         )
        //     }
        // })
      
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
                                <ImgEffect
                                    data={{
                                        img:Tokped_gambar,
                                        background:'transparent'
                                    }}
                                />
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