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
import Modal from 'react-bootstrap/Modal'
import {BsSearch} from 'react-icons/bs'
import { FullPageLoading } from '../../Component/Loading/Loading'

export default function BuyNow(){

    const {Product_Code} = useParams()
    const [showModalAlamat,setShowModalAlamat] = useState(false)
    const [showModalTambahAlamat,setShowModalTambahAlamat] = useState(false)
    const [ProductDetail,setProductDetail]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [dikirimDari,setDikirimDari]=useState(undefined)
    const [hargaNormal,setHargaNormal]=useState(undefined)
    const [hargaDiscount,setHargaDiscount]=useState(undefined)
    const [totalProduct,setTotalProduct]=useState(1)
    const [tooltipOpen, setTooltipOpen] = useState(false);
  
    const [defaultAlamatCustomer,setDefaultAlamatCustomer]=useState([
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN JALAN DEH YOK",
            "no_hp":"087785192296",
            "status":"Utama"
        },
        {
            "nama_customer":"BAYU",
            "alamat":"JALAN LAGI",
            "no_hp":"087785192296",
            "status":"Rumah"
        },
        {
            "nama_customer":" DARMAWAN",
            "alamat":"JALAN YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        },
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN GIh YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        },
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN COk YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        }

        ])
    const [alamatCustomer,setAlamatCustomer]=useState([
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN JALAN DEH YOK",
            "no_hp":"087785192296",
            "status":"Utama"
        },
        {
            "nama_customer":"BAYU",
            "alamat":"JALAN LAGI",
            "no_hp":"087785192296",
            "status":"Rumah"
        },
        {
            "nama_customer":" DARMAWAN",
            "alamat":"JALAN YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        },
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN GIh YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        },
        {
            "nama_customer":"BAYU DARMAWAN",
            "alamat":"JALAN COk YOK",
            "no_hp":"087785192296",
            "status":"Kantor"
        }

        ])
        
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
    // GOOGLE END

    
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

    // SEARCHING PRODUCT DETAIL

    const product_detail_func=()=>{
        axios.post(`https://products.sold.co.id/get-product-details?product_code=${Product_Code}`)
        .then((res)=>{
            console.log(res.data)
            var alamat = res.data.PIC_company_address
            var split_alamat = alamat.split(',')
            var dikirim_dari = split_alamat[4]
            var hargaAwal = parseInt(res.data.Sell_Price)
            var discount = parseInt(res.data.Sell_Price * 0.1)
            var hargaTotal = hargaAwal-discount
            
            setHargaNormal(hargaAwal)
            setHargaDiscount(hargaTotal)
            setDikirimDari(dikirim_dari)
            console.log(dikirim_dari)
            setProductDetail(res.data)
            setIsLoading(false)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(ProductDetail === undefined){
            product_detail_func()
        }else {
            setIsLoading(false)
            setAlamatCustomer(defaultAlamatCustomer)
        }
    },[])
    // SEARCHING PRODUCT DETAIL END
    
  

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

    const changeAddressToThis=(item)=>{

        // console.log(item)
        var allAlamat = alamatCustomer
        alamatCustomer.forEach((val,index)=>{
            if(alamatCustomer[index].status === 'Utama'){
                alamatCustomer[index].status = "Rumah"
            }
        })
        allAlamat[item].status = 'Utama'
        setAlamatCustomer(allAlamat)
        setShowModalAlamat(false)
    }
    const renderAlamatCustomer=()=>{
        return alamatCustomer.map((val,index)=>{
            // console.log(val)
            if(val.status === 'Utama' ){
                return (
                    <div key={index + 1} className='box-alamat-card active-alamat-card-utama'>
                        <div className="alamat-nama-customer">
                            <p>{val.nama_customer} <span>({val.status})</span></p>
                            <div className="utama-alamat-box">
                                <p>{val.status}</p>
                            </div>
                        </div>
                        <p className="nomor-hp-customer">{val.no_hp}</p>
                        <div className="box-detail-alamat-customer">
                            <p>{val.alamat}</p>
                        </div>
                        <div className="box-btn-alamat">
                            <div className="btn-ganti-alamat">
                                <p>Ubah Alamat</p>
                            </div>         
                        </div>
                    </div>
                )
            }else {
                return (
                    <div  key={ index + 1} className="box-alamat-card" >
                        <div className="alamat-nama-customer">
                            <p>BAYU <span>({val.status})</span></p>
                            <div className="utama-alamat-box">
                                <p>{val.status}</p>
                            </div>
                        </div>
                        <p className="nomor-hp-customer">{val.no_hp}</p>
                        <div className="box-detail-alamat-customer">
                            <p>{val.alamat}</p>
                        </div>
                        <div className="box-btn-alamat">
                            <div className="btn-ganti-alamat">
                                <p>Ubah Alamat</p>
                            </div>
                            <div className="btn-jadikan-utama" onClick={()=>changeAddressToThis(index)}>
                                <p>Jadikan Alamat Utama</p>
                            </div>          
                        </div>
                    </div>
                )
            }
        })
    }

    const renderAlamatUtama=()=>{
        // console.log(alamatCustomer)
        return alamatCustomer.map((val,index)=>{
            if(val.status === 'Utama'){
                return (
                    <>
                        <div  key={index+1} className="checking-alamat-left">
                            <div className="alamat-name-belilangsung">
                                <div className="status-alamat-box">
                                    <p>{val.status}</p>
                                </div>
                                <p>{val.status} - <span>{val.nama_customer}({val.no_hp})</span></p>
                            </div>
                            <div className="alamat-detail-belilangsung">
                                <p>{val.alamat}</p>
                            </div>
                        </div>
                        <div className="checking-alamat-right">
                            <BsChevronRight className="icon-right"/>
                        </div>
                    </>
                )
            }
        })
    }

    const open_change_address=()=>{
        setAlamatCustomer(defaultAlamatCustomer)
        setShowModalAlamat(true)
    }
    const searching_alamat=(params)=>{

        if(params.length > 2 ){
            console.log(params)
            var data_searching = []
            var searching = alamatCustomer.filter((filter)=>{
                if(filter.alamat.toUpperCase().includes(params.toUpperCase())){
                    console.log(filter)
                    data_searching.push(filter)
                    return filter
                }
            })
            setAlamatCustomer(data_searching)
        }else if(params.length === 0) {
            setAlamatCustomer(defaultAlamatCustomer)
        }
    }

    const tambah_qty_product=()=>{


        var qtyNow = totalProduct
        console.log(parseInt(totalProduct))
        console.log(qtyNow)
        setTotalProduct((qtyNow + 1))
    }

    const kurang_qty_product=()=>{
        
    }

    const tambahAlamatFunc=()=>{
        setShowModalTambahAlamat(true)
    }
    if(isLoading){
        return (
            <>
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                    {FullPageLoading(isLoading,100,'#0095DA')}
                </div>
            </>
        )
    }
    return(

        <>
            {/* MODAL PILIH ALAMAT */}
            <Modal
                show={showModalAlamat}
                onHide={() => setShowModalAlamat(false)}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton className="modal-header-success">
                <Modal.Title className="modal-header-success-cart" id="example-custom-modal-styling-title">
                    <p>Pilih Alamat Pengiriman</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-alamat-buynow">
                    <div className="searching-box-alamat">
                        <input type="text"  className="input-searching-alamat" placeholder='Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman' onChange={(e)=>searching_alamat(e.target.value)}/>
                        <div className="box-icon-searching">
                            <BsSearch className="icon-searching"/>
                        </div>
                    </div>
                    <div className="modal-body-for-scroll-alamat">
                        <div className="box-tambah-alamat-baru" onClick={tambahAlamatFunc}>
                            <p>Tambah Alamat Baru</p>
                        </div>
                        
                       {renderAlamatCustomer()}
                    </div>

                </Modal.Body>
            </Modal>
            {/* MODAL PILIH ALAMAT */}

            {/* MODAL TAMBAH ALAMAT */}
            <Modal
                show={showModalTambahAlamat}
                onHide={() => setShowModalTambahAlamat(false)}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton className="modal-header-success">
                <Modal.Title className="modal-header-buynow" id="example-custom-modal-styling-title">
                    <p>Pilih Alamat Pengiriman</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-alamat-buynow">
                    <div className="box-modal-tambah-alamat">
                        <div className="box-top-alamat-status">
                            <div className="box-top-number-status">
                                <div className="box-bulat-status active-status-bulat">
                                    <p>1</p>
                                </div>
                                <div className="box-garis-status">

                                </div>
                                <div className="box-bulat-status ">
                                    <p>2</p>
                                </div>
                                <div className="box-garis-status">
                                    
                                </div>
                                <div className="box-bulat-status ">
                                    <p>3</p>
                                </div>
                            </div>
                            <div className="box-top-detail-status">
                                <div className="detail-box-item-status">
                                    <p>Cari Lokasi Pengirimanmu</p>
                                </div>
                                <div className="detail-box-item-status">
                                    <p>Cari Lokasi Pengirimanmu</p>
                                </div>
                                <div className="detail-box-item-status">
                                    <p>Cari Lokasi Pengirimanmu</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
            {/* MODAL TAMBAH ALAMAT */}


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
                                <p>{ProductDetail.PIC_company_name}</p>
                                <p>{dikirimDari}</p>
                            </div>
                            <div className="product-card-dibeli">
                                <div className="box-img-dibeli">
                                    <ImgEffect data={{
                                        img:ProductDetail.Picture_1,
                                        background:'#ccc'
                                        }}
                                    />
                                </div>
                                <div className="box-product-name-dibeli">
                                    <div className="name-dibeli-box">
                                        <p>{ProductDetail.Name}</p>
                                    </div>
                                    <div className="harga-dibeli-box">
                                        <p>RP {commafy(hargaNormal)}</p>
                                        <p>RP {commafy(hargaDiscount)}</p>
                                    </div>
                                    <div className="box-note-dibeli">
                                        <p>Tulis Catatan</p>     
                                        <div className="box-tambah-product-dibeli">
                                            <div className="plus-minus-box-dibeli">
                                                <FiMinus className='icon-minus-dibeli' onClick={kurang_qty_product}/>
                                                <input type="number"  value={totalProduct} placeholder="1" className="input-product-dibeli"/>
                                                <BsPlus className='icon-plus-dibeli' onClick={tambah_qty_product}/>
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
                        <div className="checking-alamat-belilangsung" onClick={open_change_address}>
                            {renderAlamatUtama()}
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
                                            <p>RP.{commafy(hargaDiscount)}</p>
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
                                            <p className="total-tagihan">
                                                Total Tagihan
                                            </p>
                                            <p className="price-tagihan">
                                                RP.18.679.000
                                             </p>
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