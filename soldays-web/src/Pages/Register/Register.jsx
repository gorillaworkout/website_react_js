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
        setShowloginButton(false);
        setShowlogoutButton(true);
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
          }else {
            setEmailCorrect(false)
            
          }   
    }

    const CheckingEmailCustomer=()=>{

        
        setEmailState(true)
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
                                    <div className="password-keisi-login" tabIndex={0}>
                                        {
                                            lihatPassword ? 
                                            <>
                                                <IoEyeSharp className="icon-mata" onClick={()=>onClickLihatPassword(true)}/>
                                                <input type="text" className="input-email-keisi testing" onChange={(e)=>onInputPassword(e.target.value)} />
                                                
                                            </>
                                            : 
                                            <>
                                                <BsFillEyeSlashFill className="icon-mata" onClick={()=>onClickLihatPassword(false)}/>
                                                <input type="password" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                                
                                            </>
                                        }
                                        
                                    </div>
                                    {
                                        passwordError ? 
                                        <p>Format Email Salah</p>
                                        :
                                        <p>Minimal 8 Karakter</p>
                                    }
                                </div>
                                <div className="btn-selanjutnya-register">
                                    {
                                        passwordCorrect ? 
                                        <div className="btn-next-register active-register" onClick={CheckingEmailCustomer}>
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
                                    <input type="email" className="input-email-login"  onChange={(e)=>onInputEmailRegister(e.target.value)} />
                                    <p>Contoh:email@soldays.com</p>
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
                    <p>PT Solusi Data Internusa  <span>|</span></p>
                    <p>Bantuan</p>
                </div>
            </div>
        </>
    )
}