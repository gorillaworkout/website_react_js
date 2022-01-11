import React, { useState, useEffect } from 'react'


import Cart from '../../Assets/marketplace/blibli.png'
import Cart2 from '../../Assets/marketplace/catalog.png'
import Cart3 from '../../Assets/marketplace/gmaps.png'
import './Slider.css'
import Carousel from 'react-bootstrap/Carousel'

export default function SliderImg(){




    return (
        <>
            <Carousel>
                <Carousel.Item interval={2000}>
                    <img
                    className="d-block w-100"
                    src={Cart}
                    alt="First slide"
                    />
               
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    src={Cart2}
                    alt="Second slide"
                    />
                
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={Cart3}
                    alt="Third slide"
                    />
       
                </Carousel.Item>
            </Carousel>
        </>
    )
}