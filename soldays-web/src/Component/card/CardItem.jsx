import React, { useState, useEffect } from 'react'
import {badge_new,badge_groupbuy,icon_cart,new_iklan_left} from '../../Assets/Assets'
import ImgEffect from '../Effect/img_effect'
import {Link} from 'react-router-dom'
import '../../Styles/CardItem.scss'
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

export default function CardItem({arr}){


    return (
        <>
        <Link to={`${arr.Link}`}  key={arr.index} className="card-product-box  hvr-float-shadow" onClick={arr.onFunc}>
            <div className="box-badge-product-card">
                <img src={badge_new} alt="" id="badge_new"/>
            </div>
            <div className="box-img-product-card">
                <ImgEffect data={{
                    img:arr.Img,
                    background:'#ccc'
                    }}
                />
            </div>
            <div className="box-price-buy-product-card ">
                <div className="product-name-detail">
                    <p>{arr.Name}</p>
                </div>
                <div className="box-price-product-detail">
                    <div className="inner-price-box-product-card">
                        <div className="box-top-price-product-card">
                            <p id="discount-price">RP.{commafy(arr.HargaAwal)}</p>
                        </div>
                        <div className="box-top-price-product-card">
                            <p id="normal-price">RP.{commafy(arr.HargaTotal)}</p>
                        </div>
                    </div>
                    <div className="inner-buy-box-product-card" onClick={arr.funcBuyNow}>
                        <img src={icon_cart} alt="" />
                    </div>
                </div>
            </div>
        </Link>
        </>
    )
}