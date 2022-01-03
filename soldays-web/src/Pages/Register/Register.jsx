import React, { useState,useEffect } from 'react'
import './Register.css'
import {LogoLoginTokped,logo_soldays} from '../../Assets/Assets'
import ImgEffect from '../../Component/Effect/img_effect'
import Register_Tokped from '../../Assets/tokped_gambar/register_gambar.png'
import {Link} from 'react-router-dom'
import {OathClientId} from '../../helpers/OathGoogle'
import { GoogleLogin,GoogleLogout } from 'react-google-login'; 
import { toast } from 'react-toastify';
import {IoEyeSharp} from 'react-icons/io5'
import {BsFillEyeSlashFill} from 'react-icons/bs'
import {BiArrowBack} from 'react-icons/bi'
import axios from 'axios'

export default function Register(){
    toast.configure()
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const [emailCustomer,setEmailCustomer]=useState('')
    const [emailCorrect,setEmailCorrect]=useState(false) // input email udh ke isi atau belum
    const [passwordCorrect,setPasswordCorrect]=useState(false) // input password udh ke isi atau belum
    const [loadingCheckEmail,setLoadingCheckEmail]=useState(false)
    const [emailState,setEmailState]=useState(false) // state untuk kalo email ke isi berarti masuk password muncul
    const [lihatPassword,setLihatPassword]=useState(false)
    const [passwordCustomer,setPasswordCustomer]=useState('')
    const [customerName,setCustomerName]=useState('')
    const [passwordError,setPasswordError]=useState(false)
    const [isEmailEmpty,setIsEmailEmpty]=useState(true)

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password){
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        return re.test(String(password))

    }
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setCustomerName(res.profileObj.name)
        setEmailCustomer(res.profileObj.email)
        setPasswordCustomer('BesarSepertiTokped2022')
        setShowloginButton(true);
        setShowlogoutButton(false);
        registerCustomer()
    };
    const onSignoutSuccess = () => {
        //   alert("You have been logged out successfully");
          toast.error('Berhasil Logout', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
          console.clear();
          setShowloginButton(true);
          setShowlogoutButton(false);
      };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onInputEmailRegister=(email)=>{
        
          var checking_email = validateEmail(email)
        
          if(checking_email){
            setEmailCustomer(email)
            setEmailCorrect(true)
            setLoadingCheckEmail(false)
            setIsEmailEmpty(true)
          }else {
            setEmailCorrect(false)
            setIsEmailEmpty(false)
            
          }   
    }

    const CheckingEmailCustomer=()=>{
        console.log('checking email customer jalan',emailCustomer)
        axios.post(`https://customers.sold.co.id/get-customer-information?email=${emailCustomer}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data !== false){
                setEmailState(false)
                toast.error('Email Sudah Terdaftar', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else { // email blm ke daftar

                setEmailState(true)

            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const registerCustomer=()=>{
        var default_address = 'Jl. Dr. Susilo Raya No.C2 RT.1/RW.5 Grogol Kec. Grogol petamburan Kota Jakarta Barat DKI Jakarta'
        var tanggal_lahir = '02/08/1996'
        var default_number = '087785192297'




        axios.post(`https://customers.sold.co.id/password-generator?Password=${passwordCustomer}`)
        .then((res)=>{
            var final_pass = res.data

            axios.post(`https://customers.sold.co.id/get-customer-code`)
            .then((res)=>{
                var token = JSON.stringify(res.data)
                localStorage.setItem('token',token)
                var data = {
                    customer_data : {
                       Customer_Code : localStorage.getItem("token"),
                       First_Name : customerName,
                       Last_Name : '',
                       User_Password :final_pass,
                       Birthday : tanggal_lahir,
                       Created_Date : "CURRENT_TIMESTAMP()",
                       Last_Login : "CURRENT_TIMESTAMP()",
                       Email : emailCustomer,
                       Contact_Number_1 : default_number,
                       Contact_Number_2 : '',
                       Address_1 : default_address,
                       Address_2 : '',
                       Address_3 : '',
                       Address_4 : '',
                       Address_5 : '',
                       Status : "pending",
                       User_Type : "Customer",
                       account_number: '',
                       referral_customer_code: '',
                       ktp:''
                   }
               }
               axios.post(`https://customers.sold.co.id/create-new-customer-direct-from-user`,data,{
                headers:{
                    "Content-Type":'application/json'
                },
                "data":JSON.stringify({
                    "Customer_Code": data.customer_data.Customer_Code,
                    "First_Name": data.customer_data.First_Name,
                    "Last_Name": data.customer_data.Last_Name,
                    "User_Password": data.customer_data.User_Password,
                    "Birthday": data.customer_data.Birthday,
                    "Created_Date": data.customer_data.Created_Date,
                    "Last_Login": data.customer_data.Last_Login,
                    "Email": data.customer_data.Email,
                    "Contact_Number_1": data.customer_data.Contact_Number_1,
                    "Contact_Number_2": data.customer_data.Contact_Number_2,
                    "Address_1": data.customer_data.Address_1,
                    "Address_2": data.customer_data.Address_2,
                    "Address_3": data.customer_data.Address_3,
                    "Address_4": data.customer_data.Address_4,
                    "Address_5": data.customer_data.Address_5,
                    "Status": data.customer_data.Status,
                    "User_Type": data.customer_data.User_Type,
                    "ktp":data.customer_data.ktp
                })
            }).then((res)=>{
                console.log(res.data)
                console.log(data)
                
                if(res.data === true){
                    toast.error('Register Berhasil', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else {
                    toast.error('Register Gagal, Kemungkinan Email Sudah digunakan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch((err)=>{
                
            })
               
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onInputPassword=(password)=>{
        var checking_password= validatePassword(password)
        if(checking_password){
            setPasswordCustomer(password)
            setPasswordError(false)
           
        }else {
            if(password.length < 8 && password.length > 0){
                setPasswordCustomer('')
                setPasswordError(true)

            }
        }
      }
    const onInputCustomer=(customer)=>{
        setCustomerName(customer)
    }
      
      useEffect(()=>{
        if(passwordCustomer &&  customerName){
            setPasswordCorrect(true)
        }else {
            setPasswordCorrect(false)
        }
      },[customerName, passwordCustomer])

      const onClickLihatPassword=()=>{
          setLihatPassword(!lihatPassword)
      }
    return (
        <>
        {}
            <div className="container-register">
                <div className="box-top-judul-register container">
                    <Link to="/" className="box-img-login">
                        <ImgEffect
                            data={{
                                img:logo_soldays,
                                background:'transparent'
                            }}
                        />
                    </Link>
                </div>
                <div className="box-mid-register-detail">
                    <div className="detail-register-left">
                        <div className="box-img-register">
                            <ImgEffect
                                data={{
                                    img:Register_Tokped,
                                    background:'transparent'
                                }}
                            />
                        </div>
                        <p>Jual Beli Mudah Hanya di Soldays</p>
                        <p>Gabung dan rasakan kemudahan bertransaksi di Soldays</p>
                    </div>
                    {
                        emailState ?
                        <div className="detail-register-right">
                            <div className="box-card-register">
                                <div className="register-top-card-detail">
                                    <div className="register-daftar-card-detail">
                                        <BiArrowBack className='icon-back' onClick={()=>setEmailState(false)}/>
                                        <p>Daftar Dengan Email</p>
                                    </div>
                                    <p>{emailCustomer}</p>
                                </div>
                                <div className="box-input-email-login">
                                    <p>Nama Lengkap</p>
                                    <input type="text" className="input-email-login"  onChange={(e)=>onInputCustomer(e.target.value)} />
                                </div>
                                <div className="box-input-email-login">
                                    <p>Password</p>
                                    {
                                        passwordError?
                                        <>
                                            <div className="password-keisi-login wrong-input" tabIndex={0}>
                                                {
                                                    lihatPassword ? 
                                                    <>
                                                        <IoEyeSharp className="icon-mata" onClick={()=>onClickLihatPassword(true)}/>
                                                        <input type="text" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                                        
                                                    </>
                                                    : 
                                                    <>
                                                        <BsFillEyeSlashFill className="icon-mata" onClick={()=>onClickLihatPassword(false)}/>
                                                        <input type="password" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                                        
                                                    </>
                                                }
                                                
                                            </div>
                                            <p>Format Password Salah</p>
                                        </>
                                        :
                                        <>
                                            <div className="password-keisi-login" tabIndex={0}>
                                                {
                                                    lihatPassword ? 
                                                    <>
                                                        <IoEyeSharp className="icon-mata" onClick={()=>onClickLihatPassword(true)}/>
                                                        <input type="text" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                                        
                                                    </>
                                                    : 
                                                    <>
                                                        <BsFillEyeSlashFill className="icon-mata" onClick={()=>onClickLihatPassword(false)}/>
                                                        <input type="password" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                                        
                                                    </>
                                                }
                                            </div>
                                            <p>Minimal 8 Karakter</p>
                                        </>

                                    }
                                </div>
                                <div className="btn-selanjutnya-register">
                                    {
                                        passwordCorrect ? 
                                        <div className="btn-next-register active-register" onClick={registerCustomer}>
                                            <p>Daftar</p>
                                        </div>
                                        :   
                                        <div className="btn-next-register">
                                            <p>Daftar</p>
                                        </div>
                                    }
                                </div>
                                <div className="box-privacy-menyetujui">
                                    <p>Dengan mendaftar,saya menyetujui</p>
                                    <p>
                                        <span>Syarat dan Ketentuan  </span>
                                        serta
                                        <span> Kebijakan Privasi</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                        :
                        <div className="detail-register-right">
                            <div className="box-card-register">
                                <div className="register-top-card-detail">
                                    <p>Daftar Sekarang</p>
                                    <p>Sudah punya akun Tokopedia ? <span>Masuk</span></p>
                                </div>
                                <div className="register-with-google-detail">
                                    {
                                        showloginButton ? 
                                        <GoogleLogin
                                            clientId={OathClientId}
                                            buttonText="Google"
                                            onSuccess={onLoginSuccess}
                                            onFailure={onLoginFailure}
                                            cookiePolicy={'single_host_origin'}
                                            className="btn-google-real"
                                        /> : null

                                    }
                                    {showlogoutButton ? 
                                        <GoogleLogout
                                        clientId={OathClientId}
                                        buttonText="Sign Out"
                                        onLogoutSuccess={onSignoutSuccess}
                                        className="btn-google-real"
                                        >
                                        </GoogleLogout>
                                        : 
                                        null
                                    }
                                </div>
                                <div className="login-with-another-register">
                                    <div className="box-garis-login">

                                    </div>
                                    <p>atau masuk dengan</p>
                                    <div className="box-garis-login">

                                    </div>
                                </div>
                                <div className="box-input-email-login">
                                    <p>Email</p>
                                    {
                                        isEmailEmpty ?
                                        <>
                                          
                                            <>
                                                <input type="email" className="input-email-login"  onChange={(e)=>onInputEmailRegister(e.target.value)} />
                                                <p>Contoh:email@soldays.com</p>
                                            </>
                            
                                        </>
                                        :
                                        <>
                                            {
                                                emailCorrect ?
                                                <>
                                                    <input type="email" className="input-email-login"  onChange={(e)=>onInputEmailRegister(e.target.value)} />
                                                    <p>Contoh:email@soldays.com</p>
                                                </>
                                                :
                                                <>
                                                    <input type="email" className="input-email-login wrong-input"  onChange={(e)=>onInputEmailRegister(e.target.value)} />
                                                    <p>Format Email Salah</p>
                                                </>

                                            }
                                        </>
                                    }
                   
                                </div>
                                <div className="btn-selanjutnya-register">
                                    {
                                        emailCorrect ? 
                                        <div className="btn-next-register active-register" onClick={CheckingEmailCustomer}>
                                            <p>Selanjutnya</p>
                                        </div>
                                        :   
                                        <div className="btn-next-register">
                                            <p>Selanjutnya</p>
                                        </div>
                                    }
                                </div>
                                <div className="box-privacy-menyetujui">
                                    <p>Dengan mendaftar,saya menyetujui</p>
                                    <p>
                                        <span>Syarat dan Ketentuan  </span>
                                        serta
                                        <span> Kebijakan Privasi</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    }
                </div>
                 <div className="box-solped-footer container">
                    <p>PT Solusi Digital Internusa  <span>|</span></p>
                    <p>Bantuan</p>
                </div>
            </div>
        </>
    )
}