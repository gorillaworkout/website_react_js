import React, { useState,useEffect } from 'react'
import './BuyNow.css'
import '../../Styles/BuyNow.scss'
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
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Dropdown from 'react-bootstrap/Dropdown'
import getTiki from '../../Services/getTiki'
import errorTokped from '../../Assets/tokped_gambar/cart-kosong.jpeg'
import { CardLink } from 'reactstrap'

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
    const [key, setKey] = useState('Province');

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
    const [finalAddress,setFinalAddress]=useState([])
    const [allCourier,setAllCourier]=useState(undefined)
    const [allProvince,setAllProvince]=useState([])   
    const [allCity,setAllCity]=useState([])
    const [allDistrict,setAllDistrict]=useState([])
    const [allSubdistrict,setAllSubdistrict]=useState([])

    // state tambah alamat
    const [addressType,setAddressType]=useState('') // address type pas di tambah address modals
    const [customerName,setCustomerName]=useState('')
    const [customerNumber,setCustomerNumber]=useState('')
    // state tambah alamat end


    // STATE PROVINCE CITY DISTRICT
    const [provincePilihan,setProvincePilihan]=useState('')
    const [cityPilihan,setCityPilihan]=useState('')
    const [districtPilihan,setDistrictPilihan]=useState('')
    const [subdistrictPilihan,setSubdistrictPilihan]=useState('')

    // END OF STATE PROVINCE CITY DISTRICT
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

    // useEffect(()=>{
        
    //     if(finalAddress){
    //         console.log(finalAddress)
         
    //         if(finalAddress[0] !== undefined){
    //             console.log('masuk ke if use effect disabled')
    //             setIsCityDisabled(false)
    //             if(finalAddress[1] !== undefined){
    //                 setIsDistrctDisabled(false) 
    //                 console.log('masuk ke  if use effect disabled')
    //             }else if (finalAddress[1] !== undefined && finalAddress[2] !== undefined){
    //                 setIsDistrctDisabled(false)
    //                 setIsSubdistrctDisabled(false)
    //                 console.log('masuk ke else if')
    //             }
    //         }else {
    //             console.log('masuk ke else')
    //             setIsCityDisabled(true)
    //             setIsDistrctDisabled(true)
    //             setIsSubdistrctDisabled(true)   
    //         }            
    //     }

    // },[finalAddress])
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
        .then(async(res)=>{

            // getTiki.getAllCourier().then(alert)
            let findAllCourier =  await getTiki.getAllCourier()
            let getAllProvince =  await getTiki.getAllProvince(findAllCourier.Courier,findAllCourier.Courier_Code)
            setAllCourier(findAllCourier)
            setAllProvince(getAllProvince)

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


    const renderProvince=()=>{
        return allProvince.map((val,index)=>{
            return (
                <>
                    <Dropdown.Item href="#/action-1" className="province_class" value={val.Province} id={`province_${index+1}`} onClick={()=>onHandleProvince(val.Province,index+1)}>{val.Province}</Dropdown.Item>
                </>
            )
        })
    }
    const onHandleProvince=(value,id)=>{
        let allElementProvince = document.querySelectorAll('.province_class')
        allElementProvince.forEach((val)=>{
            val.classList.remove('active_province')
        })
        let allElementCity = document.querySelectorAll('.city_class')
        allElementCity.forEach((val)=>{
            val.classList.remove('active_province')
        })
        let allElementDistrict = document.querySelectorAll('.district_class')
        console.log(allElementDistrict)
        allElementDistrict.forEach((val)=>{
            val.classList.remove('active_province')
        })
        let allElementSubdistrict = document.querySelectorAll('.subdistrict_class')
        console.log(allElementSubdistrict)
        allElementSubdistrict.forEach((val)=>{
            val.classList.remove('active_province')
        })

        let element = document.getElementById(`province_${id}`)
        element.classList.add('active_province')
        setKey('City')
        let finalAddressResult = []
        
        finalAddressResult[0] = value
        setFinalAddress(finalAddressResult)
        setProvincePilihan(value)
        fetchingCity(value)

        let districtTab = document.querySelector('.district_tab')

        let subdistrictTab = document.querySelector('.subdistrict_tab')
        districtTab.disabled = true
        subdistrictTab.disabled =true

    

    }

 

    const fetchingCity=async(Province)=>{

        let allCity = await getTiki.getAllCity(allCourier.Courier, allCourier.Courier_Code,Province)
        setAllCity(allCity)
    }

    const renderCity=()=>{

        if(allCity !== undefined){
            if(allCity.length > 0 ){
                    return allCity.map((val,index)=>{
                        return (
                            <Dropdown.Item href="#/action-1" className="city_class" value={val.City} id={`city_${index+1}`} onClick={()=>onHandleCity(val.City,index+1)}>{val.City}</Dropdown.Item>
                        )
                    })
            }else {
                return (
                    <>
                        <div className="box-error-empty">
                            <img src={errorTokped} alt="" className="img-error-empty" />
                            <p>PILIH PROVINCE TERLEBIH DAHULU</p>
                        </div>
                    </>
                )
            }
        }else {
            return (
                <>
                <p>INI ELSE LUAR</p>
                </>
            )
        }
    }
    const onHandleCity=(value,id)=>{
        let allElement = document.querySelectorAll('.city_class')
        allElement.forEach((val)=>{
            val.classList.remove('active_province')
        })
        let element = document.getElementById(`city_${id}`)
        element.classList.add('active_province')
        setKey('District')
        let finalAddressResult = finalAddress
        finalAddressResult.splice(1,3)
        finalAddressResult.push(value)
        console.log(finalAddressResult)
        setFinalAddress(finalAddressResult)
        setCityPilihan(value)
        fetchingDistrict(value)

    }



    const fetchingDistrict=async(City)=>{
        let allDistrict = await getTiki.getAllDistrict(allCourier.Courier,allCourier.Courier_Code,City)
        setAllDistrict(allDistrict)
    }

    const renderDistrict=()=>{
        if(finalAddress[1] !== undefined){
            return allDistrict.map((val,index)=>{
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="district_class" value={val.District} id={`district_${index+1}`} onClick={()=>onHandleDistrict(val.District,index+1)}>{val.District}</Dropdown.Item>
                    </>
                )
            })
        }else {
            return (
                <>
                     <div className="box-error-empty">
                        <img src={errorTokped} alt="" className="img-error-empty" />
                        <p>PILIH CITY TERLEBIH DAHULU</p>
                    </div>
                </>
            )
        }
    }
    const onHandleDistrict=(value,id)=>{
        let allElement = document.querySelectorAll('.district_class')
        allElement.forEach((val)=>{
            val.classList.remove('active_province')
        })

        let element = document.getElementById(`district_${id}`)
        element.classList.add('active_province')
        setKey('Subdistrict')
        let finalAddressResult = finalAddress
        finalAddressResult.splice(2,2)
        finalAddressResult.push(value)
        setFinalAddress(finalAddressResult)
        setDistrictPilihan(value)
        fetchingSubdistrict(value)

        
        let districtTab = document.querySelector('.district_tab')
        console.log(districtTab,'346')
        



    }
    const fetchingSubdistrict=async(district)=>{
        let allSubdistrict  = await getTiki.getAllSubdistrict(allCourier.Courier, allCourier.Courier_Code,district)
        setAllSubdistrict(allSubdistrict)
    }
    const renderSubDistrict=()=>{
        if(finalAddress[2] !== undefined){
            return allSubdistrict.map((val,index)=>{
                return (
                    <>
                        <Dropdown.Item href="#/action-1" className="subdistrict_class" value={val.Sub_District} id={`subdistrict_${index+1}`} onClick={()=>onHandleSubDistrict(val.Sub_District,val.Zipcode,index+1)}>{val.Sub_District} - {val.Zipcode}</Dropdown.Item>
                    </>
                )
            })
        }else {
            return (
                <>
                    <div className="box-error-empty">
                        <img src={errorTokped} alt="" className="img-error-empty" />
                        <p>PILIH DISTRICT TERLEBIH DAHULU</p>
                    </div>
                </>
            )
        }
    }
    const onHandleSubDistrict=(value,zipcode,id)=>{
        let allElement = document.querySelectorAll('.subdistrict_class')
        console.log(allElement)
        allElement.forEach((val)=>{
            val.classList.remove('active_province')
        })
        
        let element = document.getElementById(`subdistrict_${id}`)
        element.classList.add('active_province')
        // setKey('Kodepos')
        let finalAddressResult = finalAddress
        finalAddressResult.splice(3,2)
        finalAddressResult.push(value)
        finalAddressResult.push(zipcode)
        // finalAddressResult[3] = value
        // finalAddressResult[4] = zipcode
        setFinalAddress(finalAddressResult)
        setSubdistrictPilihan(value)
    }


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
        setFinalAddress([])
        setKey('Province')
        setShowModalTambahAlamat(true)
    }

    const onHandleAddressType=(params,type)=>{

        let element = document.querySelector(`#${params}`)
        let allElement = document.querySelectorAll(`.utama-btn`)
        allElement.forEach((val,index)=>{
            val.classList.remove('active-pilihan')
        })
        element.classList.add('active-pilihan')
        setAddressType(type)

    }

    const onChangeCustName=(value)=>{
        setCustomerName(value)
    }

    const onChangeCustNumber=(value)=>{
        setCustomerNumber(value)
    }

    const onSaveTambahAlamat=()=>{
        console.log(customerName)
        console.log(customerNumber)
        console.log(addressType)
        console.log(finalAddress)
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
                    <p>Tambah Alamat Pengiriman</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-alamat-buynow">
                    <div className="box-modal-tambah-alamat">
                        <div className="box-input-card">
                            <input type="text"  className="input-tambah-alamat" placeholder='Nama Lengkap' onChange={(e)=>onChangeCustName(e.target.value)}/>
                            <input type="number"  className="input-tambah-alamat" placeholder='Nomor Handphone' onChange={(e)=>onChangeCustNumber(e.target.value)}/>
                        </div>
                        <div className="box-result-address">
                            <input type="text" className="final-address-buynow" value={finalAddress} disabled />
                        </div>
                        <div className="box-province-card">
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3 list-judul"
                                >
                                <Tab eventKey="Province" title="Province" className="tab-item province_tab" >
                                    <div className="list-item-box">
                                        {renderProvince()}
                                    </div>
                                </Tab>
                                <Tab eventKey="City" title="City" className="tab-item city_tab">
                                    <div className="list-item-box">
                                        {renderCity()}
                                    </div>
                                </Tab>
                                <Tab eventKey="District" title="District" className="tab-item district_tab" >
                                    <div className="list-item-box">
                                        {renderDistrict()}
                                    </div>
                                </Tab>
                                <Tab eventKey="Subdistrict" title="Subdistrict" className="tab-item subdistrict_tab"  >
                                    <div className="list-item-box">
                                        {renderSubDistrict()}
                                    </div>
                                </Tab>
                             
                            </Tabs>
                        </div>
                        <div className="box-btn-card">
                            <div className="save-as-card">
                                <div className="utama-btn" id="btn-utama" onClick={()=>onHandleAddressType('btn-utama','utama')}>
                                    Utama
                                </div>
                                <div className="utama-btn active-pilihan" id="btn-rumah" onClick={()=>onHandleAddressType('btn-rumah','rumah')}>
                                    Rumah
                                </div>
                            </div>
                            <div className="btn-save" onClick={onSaveTambahAlamat}>
                                Simpan
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