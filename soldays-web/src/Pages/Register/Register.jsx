import React, { useState } from 'react'
import './Register.css'
import {LogoLoginTokped,logo_soldays} from '../../Assets/Assets'
import ImgEffect from '../../Component/Effect/img_effect'
import Register_Tokped from '../../Assets/tokped_gambar/register_gambar.png'
import {Link} from 'react-router-dom'
import {OathClientId} from '../../helpers/OathGoogle'
import { GoogleLogin,GoogleLogout } from 'react-google-login'; 
import { toast } from 'react-toastify';

export default function Register(){
    toast.configure()
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const [emailCustomer,setEmailCustomer]=useState('')
    const [emailCorrect,setEmailCorrect]=useState(false) // input email udh ke isi atau belum
    const [loadingCheckEmail,setLoadingCheckEmail]=useState(false)
    const [emailState,setEmailState]=useState(false) // state untuk kalo email ke isi berarti masuk password muncul

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
    return (
        <>
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
                                <div className="btn-next-register">
                                    <p>Selanjutnya</p>
                                </div>
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
                </div>
                 <div className="box-solped-footer container">
                    <p>PT Solusi Data Internusa  <span>|</span></p>
                    <p>Bantuan</p>
                </div>
            </div>
        </>
    )
}