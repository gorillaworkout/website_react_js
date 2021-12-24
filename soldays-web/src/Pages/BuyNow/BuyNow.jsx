import React, { useState,useEffect } from 'react'
import './BuyNow.css'
import Header from '../Header/Header'
import Footer from '../../Component/Footer/Footer'
import LastPageIcon from '../../Assets/tokped_gambar/last-page.png'
import ImgEffect from '../../Component/Effect/img_effect'
import Sealant from '../../Assets/tokped_gambar/sealant.png'
import {BsPlus,BsChevronRight,BsFillCheckSquareFill} from 'react-icons/bs'
import {FiMinus} from 'react-icons/fi'
import Select from 'react-select'
import { css,  } from '@emotion/react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Geocode from "react-geocode";


export default function BuyNow(){

    // GOOGLE

    const [longitude,setLongitude]=useState('')
    const [latitude,setLatitude]=useState('')
    Geocode.setApiKey("AIzaSyBQFCGbZcy-XyvOBd0fiQSFOVzrXnp63No");
    Geocode.setRegion("id");
    Geocode.setLocationType("ROOFTOP");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
    // Get address from latitude & longitude.
    
    const find_address =()=>{
        Geocode.fromLatLng(`${latitude}`, `${longitude}`).then(
            (response) => {
              const address = response.results[0].formatted_address;
              console.log(address);
            },
            (error) => {
              console.error(error);
            }
        );

    }      
      useEffect(()=>{
          if(latitude === '' && longitude === ''){
            navigator.geolocation.getCurrentPosition(function(position) {
                setLongitude(position.coords.longitude)
                setLatitude(position.coords.latitude)
                // console.log("Latitude is :", position.coords.latitude);
                // console.log("Longitude is :", position.coords.longitude);
                });
          }
    })
    

    // GOOGLE
    const {Product_Code} = useParams()
    const [totalProduct,setTotalProduct]=useState(1)
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const options_product_searching = []
    const renderPengiriman=()=>{
        return (
            <>
                <Select 
                css={css`
                    width：100% !important;
                `}
                    isClearable={true}
                    // value={currentValueProduct}
                    backspaceRemovesValue={true}
                    onChange={open_product}
                    options={options_product_searching}
                    placeholder="Pilih Pengiriman yang kamu mau"
                />
            </>
        )
    }
    const open_product=()=>{

    }

    const renderKurir=()=>{
        return (
            <>
                <Select 
                css={css`
                    width：100% !important;
                `}
                    isClearable={true}
                    // value={currentValueProduct}
                    backspaceRemovesValue={true}
                    onChange={open_product}
                    options={options_product_searching}
                    placeholder="Pilih Kurir yang kamu mau"
                />
            </>
        )
    }

    const renderAsuransi=()=>{
        return (
            <>
                <Select 
                css={css`
                    width：100% !important;
                `}
                    isClearable={true}
                    // value={currentValueProduct}
                    backspaceRemovesValue={true}
                    onChange={open_product}
                    options={options_product_searching}
                    placeholder="Pilih Asuransi yang kamu mau"
                />
            </>
        )
    }
    return(

        <>
            <div className="container-buy-now">
                <Header/>
                <div className="box-beli-langsung container">
                    <p>Beli Langsung</p>
                    <div className="last-page-beli-langsung">
                        <div className="box-img-last-page">
                            <img src={LastPageIcon} alt="" />
                        </div>
                        <p>Ini halaman terakhir dari proses belanjamu. Pastikan semua sudah benar, ya :)</p>
                    </div>
                    <div className="box-barang-dibeli-container">
                        <div className="box-barang-dibeli">
                            <p>Barang yang dibeli</p>
                            <div className="company-name-belisekarang">
                                <p>VANTSING INTERNATIONAL</p>
                                <p>JAKARTA BARAT</p>
                            </div>
                            <div className="product-card-dibeli">
                                <div className="box-img-dibeli">
                                    <ImgEffect data={{
                                        img:Sealant,
                                        background:'#ccc'
                                        }}
                                    />
                                </div>
                                <div className="box-product-name-dibeli">
                                    <div className="name-dibeli-box">
                                        <p>Logitech M100R MOUSE OPTIKAL USB KABEL DEWA BANGET PANJANGNYA</p>
                                    </div>
                                    <div className="harga-dibeli-box">
                                        <p>RP 109.000</p>
                                        <p>RP 100.000</p>
                                    </div>
                                    <div className="box-note-dibeli">
                                        <p>Tulis Catatan</p>
                                        
                                        <div className="box-tambah-product-dibeli">
                                            <div className="plus-minus-box-dibeli">
                                                <FiMinus className='icon-minus-dibeli'/>
                                                <input type="number"  default={totalProduct} placeholder="1" className="input-product-dibeli"/>
                                                <BsPlus className='icon-plus-dibeli'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-alamat-belilangsung container">
                    <p>Pengiriman dan Pembayaran</p>
                    <div className="box-pilih-alamat">
                        <div className="checking-alamat-belilangsung">
                            <div className="checking-alamat-left">
                                <div className="alamat-name-belilangsung">
                                    <div className="status-alamat-box">
                                        <p>UTAMA</p>
                                    </div>
                                    <p>RUMAH - <span>Bayu(6287785192296)</span></p>
                                </div>
                                <div className="alamat-detail-belilangsung">
                                    <p>PT.VANTSING INTERNATIONAL, Jalan PURI PINANG RANTI KECAMATAN kebon jeruk, manado bandung selatan 11550 JAKARTA BARAT TERCINTA INDONESIA</p>
                                </div>
                            </div>
                            <div className="checking-alamat-right">
                                <BsChevronRight className="icon-right"/>
                            </div>
                        </div>
                        <div className="checking-kurir-belilangsung">
                            <div className="checking-kurir-left">
                                <p>Pilih Pengiriman</p>
                                {/* <input type="number"  className="dropdown-pengiriman"/> */}
                                {renderPengiriman()}
                            </div>
                            <div className="checking-kurir-right">
                                <p>Pilih Kurir</p>
                                {renderKurir()}
                            </div>
                        </div>
                    </div>
                    <div className="box-asuransi-belilangsung">
                        <div className="dropdown-asuransi">
                            <p>Asuransi Pengiriman</p>
                            {renderAsuransi()}
                        </div>
                        <div className="box-price-asuransi">
                            <p>RP 200.000</p>
                            <BsFillCheckSquareFill className="icon-checklist"/>
                        </div>
                    </div>
                    <div className="box-pilih-alamat-2">
                        <div className="box-ringkasan-belanja">
                            <p>Ringkasan Belanja</p>
                            <div className="ringkasan-review-belanja">
                                <div className="box-price-ringkasan">
                                    <ul>
                                        <li>
                                            <p>
                                                Total Harga (1 Barang)
                                            </p>
                                            <p>RP.18.679</p>
                                        </li>
                                        <li>
                                            <p>
                                                Total Ongkos Kirim
                                            </p>
                                            <p>RP.30.000</p>
                                        </li>
                                        <li>
                                            <p>
                                                Asuransi Pengiriman
                                            </p>
                                            <p>RP 90.000</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="ringkasan-harga-belanja">
                                <div className="box-price-ringkasan">
                                    <ul>
                                        <li>
                                            <p>
                                                Total Harga (1 Barang)
                                            </p>
                                            <p>RP.18.679.000</p>
                                        </li>
                                       
                                    </ul>
                                </div>
                            </div>
                            <div className="box-btn-pilih-pembayaran">
                                <div className="btn-pilih-pembayaran">
                                    <p>Pilih Pembayaran</p>
                                </div>
                            </div>
                        </div>
                              
                    </div>
                </div>      
            </div>
            <div className="box-highlight2">
                {/* <LazyLoad> */}
                        <Footer/>
                {/* </LazyLoad> */}
            </div>
        </>
    )
}