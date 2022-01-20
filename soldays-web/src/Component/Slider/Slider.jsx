import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import './Slider.css'
import Cart from '../../Assets/marketplace/blibli.png'
import Cart2 from '../../Assets/marketplace/catalog.png'
import Cart3 from '../../Assets/marketplace/instagram.png'
import Slider from '../../Assets/slider/new_ads1.png'
import Slider2 from '../../Assets/slider/new_ads2.png'
import Slider3 from '../../Assets/slider/promo1.png'
import Slider4 from '../../Assets/slider/promo2.png'
import Slider5 from '../../Assets/slider/promo3.png'
import ImgEffect from '../Effect/img_effect'
export default function SliderImg(){


    return (
        <>
        <div className="box-slider">
           <Carousel className="carousel-slider-box">
            <Carousel.Item interval={10000}>
                <div className="box-slider-img">
                     <ImgEffect
                        data={{
                            img:Slider,
                            background:'#ccc'
                        }}
                    />
                </div>   
            </Carousel.Item>
                <Carousel.Item interval={10000}>
                    <div className="box-slider-img">
                        <ImgEffect
                            data={{
                                img:Slider2,
                                background:'#ccc'
                            }}
                        />
                    </div>
                </Carousel.Item>
                <Carousel.Item interval={10000}>
                    <div className="box-slider-img">
                        <ImgEffect
                            data={{
                                img:Slider3,
                                background:'#ccc'
                            }}
                        />
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>

        </>
    )
}