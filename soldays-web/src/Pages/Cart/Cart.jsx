import React, { useState,useEffect } from 'react';
import '../../Styles/Cart.scss'
import Header from '../Header/Header';
import gambarTest from '../../Assets/tokped_gambar/gopay-icon.png'

import Form from 'react-bootstrap/Form'
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
import {RiContactsBookLine, RiCoupon2Line} from 'react-icons/ri'
import Iframe from 'react-iframe';
import ImgEffect from '../../Component/Effect/img_effect';
import {useDispatch,useSelector} from 'react-redux'
import Cart_Kosong from '../../Assets/tokped_gambar/cart-kosong.jpeg'
import {Link} from 'react-router-dom'
export default function Cart(){

    // const Product = useSelector(state=>state.Product)
    // console.log(Product)
    const [isLoading,setIsLoading]=useState(true)
    const [allCart,setAllCart]=useState(undefined)
    const [isMinusActive,setIsMinusActive]=useState(false)
    const [isPositifActive,setIsPositifActive]=useState(false)
    const [allProductChecked,setAllProductChecked]=useState(false)
 


    useEffect(()=>{

        var allCartFromStorage = JSON.parse(localStorage.getItem('itemsInCart'))
        if(allCart === undefined){
            if(allCartFromStorage !== null){
                setAllCart(allCartFromStorage)
                setIsLoading(false)
            }else {
                setAllCart(undefined)
            }
        }else {
            setAllCart(allCartFromStorage)
            setIsLoading(false)
        }
        console.log(allCart)
    },[])


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

    const onDeleteProduct=(index,product_name)=>{
        console.log(index,product_name)
    }

    const minusProduct=(productNo,index)=>{
        console.log('minus product jalan')
        let findIndex = allCart.findIndex((val)=>{
            return val.productNo === productNo
        })
        
        let total_current_qty = allCart[findIndex].quantity // total qty sekarang
        let total_qty_left = allCart[findIndex].Stock_Quantity // total qty sisa


        if(total_current_qty < total_qty_left && total_current_qty > 1 ){
            console.log('masuk ke if 71')
            allCart[findIndex].quantity = (allCart[findIndex].quantity - 1)
            var stringify = JSON.stringify(allCart)
            localStorage.setItem('itemsInCart',stringify)
            console.log(allCart)
            setAllCart([...allCart])
            setIsMinusActive(false)

        }else if (total_current_qty > 1){
            console.log('masuk ke else if 80')
            allCart[findIndex].quantity = (allCart[findIndex].quantity - 1)
            var stringify = JSON.stringify(allCart)
            localStorage.setItem('itemsInCart',stringify)
            console.log(allCart)
            setAllCart([...allCart])
            setIsMinusActive(false)
        }else if(total_current_qty === 1 || total_current_qty < 1) {
            console.log('masuk ke else if 88')
            allCart.splice(findIndex,1)
            var stringify = JSON.stringify(allCart)
            setAllCart([...allCart])
            localStorage.setItem('itemsInCart',stringify)
            setIsMinusActive(true)
        }else {
            console.log('masuk ke else minus product') 
        }
    
    }
    const plusProduct=(productNo,index)=>{
        // console.log(productNo,index)
        // console.log(allCart)
        let findIndex = allCart.findIndex((val)=>{
            return val.productNo === productNo
        })
        
        let total_current_qty = allCart[findIndex].quantity
        let total_qty_left = allCart[findIndex].Stock_Quantity

        if( total_current_qty > total_qty_left || total_current_qty === total_qty_left){
            // gabisa add item item qty melebihi
            setIsPositifActive(true)
        }else {
            allCart[findIndex].quantity = (allCart[findIndex].quantity + 1)
            var stringify = JSON.stringify(allCart)
            localStorage.setItem('itemsInCart',stringify)
            console.log(allCart)
            setAllCart([...allCart])
            setIsPositifActive(false)
        }

    }
    const inputQty=(value)=>{
        console.log(value)
    }
    const onHandleCheckItem=(value,index)=>{
        console.log('on change cheeck item jalan')
        if(value){
            allCart[index].isChecked = true
            setAllCart([...allCart])
        }else {
            allCart[index].isChecked = false
            setAllCart([...allCart])
            
            setAllProductChecked(false)
        }

        //checking all item is true
        let result = allCart.every(function (e) {
            return e.isChecked === true
        });
        console.log(result)
        if(result){
            setAllProductChecked(true)
        }else {
            setAllProductChecked(false)
        }
       

    }
    const handleAllCheckbox=(value)=>{

        if(value){
            allCart.forEach((val,index,array)=>{
                val.isChecked = true
                if(index === array.length - 1){
                    console.log(allCart,'146')
                    setAllCart([...allCart])
                    setAllProductChecked(!allProductChecked)
                    console.log(allProductChecked,'allproductchecked')
                }
            })
        }else {
            allCart.forEach((val,index,array)=>{
                val.isChecked = false
                if(index === array.length - 1){
                    console.log(allCart,'146')
                    setAllCart([...allCart])
                    setAllProductChecked(!allProductChecked)
                    console.log(allProductChecked,'allproductchecked')
                }
            })
        }



    }
    const renderCart=()=>{
        return allCart.map((val,index)=>{
            // val.isChecked = false
            let total_harga_barang = val.quantity * parseInt(val.normal_price)
            let total_qty = val.quantity     
                return (
                    <>
                        <div  key={index+1}className="cart-item-detail">
                            <Form.Check  key={index+1} type="checkbox" label={`${val.product_name}`} checked={val.isChecked} onChange={(e)=>onHandleCheckItem(e.target.checked,index)}  className="checkbox-allproduct" />
                            <div className="detail-item">
                                <div className="img-box-detail">
                                    <ImgEffect
                                        data={{
                                            img:val.img,
                                            background:'transparent'
                                        }}
                                    />
                                </div>
                                <p>{val.product_name}</p>
                                <div className="box-list">
                                    <ul>
                                        <li>Rp{commafy(val.normal_price)}</li>
                                        <li>
                                            <div className="box-plus-minus-qty">
                                                <div className="box-minus" onClick={()=>minusProduct(val.productNo,index)}>
                                                    <AiOutlineMinus className={isMinusActive ? 'icon-plus-minus-nonactive':'icon-plus-minus'}/>
                                                </div>
                                                <input type="number" className="box-qty" value={total_qty} onChange={(e)=>inputQty(e.target.value)}/>
                                                <div className="box-plus" onClick={()=>plusProduct(val.productNo,index)}>  
                                                    <AiOutlinePlus className={isPositifActive ? 'icon-plus-minus-nonactive':'icon-plus-minus'}/>
                                                </div>
                                            </div>
                                        </li>
                                        <li>Rp{commafy(total_harga_barang)}</li>
                                        <li>
                                            <p onClick={()=>onDeleteProduct(index,val.product_name)} className="hapus_product">Hapus</p>
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                    </>
                )
            
        })
      
    }


    const renderTotalHarga=()=>{
        let total_harga = 0
        let total_product = 0
        
        allCart.forEach((val)=>{
            if(val.isChecked){
                total_harga += parseInt(val.normal_price) * val.quantity
                total_product +=1
            }
            })
                return (
                    <>
                        <div key={1} className="voucher-box">
                            <div className="voucher-part">
                                <p>
                                    <RiCoupon2Line className="icon-coupon"/>
                                    <span>Voucher Soldays</span>
                                </p>
                                <p>Gunakan/Masukkan Kode</p>
                            </div>
                        </div>
                        <div key={2} className="price-box">
                            <Form.Check  key={1} type="checkbox" label={`Product`}  checked={allProductChecked} className="checkbox-allproduct" onChange={(e)=>handleAllCheckbox(e.target.checked)} />
                            <div className="checkout-box-container">
                                <p>Total({total_product} Product) :
                                        <span> Rp.{commafy(total_harga)}</span>
                                </p>
                                <div className="btn-checkout">
                                    Checkout
                                </div>
                            </div>
                        </div>
                    </>
                )
            
        

    }
  

    if(isLoading){
        return (
            <>
                <p>LOADING</p>
            </>
        )
    }

    return (
        <>
            <div className="container-cart">
                <div className="box-header">
                    <Header/>
                </div>
                    {
                        allCart.length > 0?
                        <>
                        <div className="box-main-container">     
                            <div className="box-iklan-container">
                                <p>Semakin banyak anda berbelanja, Semoga Gaji saya ditambah</p>
                            </div>
                            <div className="box-btn-all">
                                <Form.Check  key={1} type="checkbox" label={`Product`}  className="checkbox-allproduct" checked={allProductChecked} onChange={(e)=>handleAllCheckbox(e.target.checked)} />

                                <div className="box-list">
                                    <ul>
                                        <li>Harga Satuan</li>
                                        <li>Kuantitas</li>
                                        <li>Total Harga</li>
                                        <li>Aksi</li>
                                    </ul>
                                </div> 
                            </div>
                            <div className="box-list-cart">
                                {renderCart()}
                            </div>
                            <div className="total-price-cart" >
                                {renderTotalHarga()}
                            </div>
                        </div>  
                        </>
                        :
                        <>
                            <div className="cart-kosong">
                                <img src={Cart_Kosong} alt="" />
                                <p>Keranjang belanja Anda kosong</p>
                                <Link to={'/'} className="btn-backtohome">
                                    Belanja Sekarang
                                </Link>
                            </div>
                        </>
                    }
                </div>
        
        </>
    )
}