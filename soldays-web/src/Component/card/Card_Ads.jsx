import React,{useState} from 'react'
import './Card_Ads.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImgEffect from '../Effect/img_effect'
export default function Box_Ads_small(data){

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
                    <ImgEffect
                        data={{
                            img:data.data.img,
                            background:'#ccc'
                        }}
                    />
                    </div>
                </div>
            </div>
        </>
    )
}