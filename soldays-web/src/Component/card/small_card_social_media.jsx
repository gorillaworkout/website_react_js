import React, { Component } from 'react'
import './Card_Ads.css'

export default function Small_Card_Social_media(data){
console.log(data)

    return (
        <>
            <div className={`${data.data.class}`}>
                <a href={"https://web.facebook.com/VantsingID"} target="_blank" rel="noreferrer">
                    <div className="img-logo">
                        {data.data.icon}
                        {/* <GrFacebookOption id="icon_facebook_footer"/> */}
                    </div>
                    <p id={`${data.data.cardNameClass}`}>{data.data.cardName}</p>
                </a>
            </div>
        </>
    )
}