import React from 'react'
import './Card_Ads.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function Box_Ads_small(data){
    console.log(data.data.detail_Cards)


    return (
        <>
            <div className="box-ads-small-container">
                <div className="box-ads-inner">
                    <div className="ads-inner-left"> 
                        <div className="box-img-left-card-ads">
                            <LazyLoadImage
                                alt={'ads'}
                                src={data.data.icon}
                            />
                        </div>
                        <div className="box-detail-left-card-ads">
                            <p>{data.data.detail_Cards}</p>
                        </div>
                    </div>
                    <div className="ads-inner-right">
                        <img src={data.data.img} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}