import React, { useState } from 'react'
import './login.css'
import {LogoLoginTokped,logo_soldays} from '../../Assets/Assets'
import ImgEffect from '../../Component/Effect/img_effect'
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import {IoEyeSharp} from 'react-icons/io5'
import {BsFillEyeSlashFill} from 'react-icons/bs'
import axios from 'axios'
import { css } from "@emotion/react";
import BeatLoader from 'react-spinners/BeatLoader'
import Modal from 'react-bootstrap/Modal'
import OtpInput from 'react-otp-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux'
import {LoginRedux} from '../../redux/Actions/AuthActions'
import { Link,useNavigate } from 'react-router-dom';


const oathClientID = '624689136381-n8qrmrn7cfe16hfhdgurb0jqpjeevr1l.apps.googleusercontent.com'

export default function Login(){
    const navigate = useNavigate()
    toast.configure()
    const dispatch=useDispatch()
    // const [oathClientID,setOathClientID]= useState('624689136381-n8qrmrn7cfe16hfhdgurb0jqpjeevr1l.apps.googleusercontent.com')
    const override = css`
    display: flex;
    margin: 0 auto;
    color:#27aae1;
    border-color: #27aae1;
    speedMultiplier: 1;
    size:12;
    margin:2;
    `
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#f6941c");
    const responseGoogle = (response) => {
        console.log(response);
      }

      const [showloginButton, setShowloginButton] = useState(true);
      const [showlogoutButton, setShowlogoutButton] = useState(false);
      const [emailCorrect,setEmailCorrect]=useState(false) // input email udh ke isi atau belum
      const [emailState,setEmailState]=useState(false) // state untuk kalo email ke isi berarti masuk password muncul
      const [lihatPassword,setLihatPassword]=useState(false)
      const [emailCustomer,setEmailCustomer]=useState('')
      const [passwordCustomer,setPasswordCustomer]=useState('')
      const [loadingCheckEmail,setLoadingCheckEmail]=useState(false)
      const [showModalEmailUnknown,setshowModalEmailUnknown]=useState(false)
      const [showModalOTP,setShowModalOTP]=useState(false)

      const [otp,setOtp] = useState('')
      const handleChangeOtp=(otp)=>{
          setOtp(otp)
      }

      const onLoginSuccess = (res) => {
          console.log('Login Success:', res.profileObj);
          setShowloginButton(false);
          setShowlogoutButton(true);
      };
  
      const onLoginFailure = (res) => {
          console.log('Login Failed:', res);
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
      function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

      const onInputEmail=(email)=>{
        //   console.log(email)
          var checking_email = validateEmail(email)
        //   console.log(checking_email)
          if(checking_email){
            setEmailCustomer(email)
            setEmailCorrect(true)
            setLoadingCheckEmail(false)
          }else {
            setEmailCorrect(false)
            //   console.log('struktur email salah')
          }   
      }
      const onInputPassword=(password)=>{
        setPasswordCustomer(password)
      }
      const backToDefault=(params)=>{
          setEmailState(params)
      }
      const onCheckEmailLogin=()=>{
        setLoadingCheckEmail(true)
        axios.post(`https://customers.sold.co.id/get-customer-information?email=${emailCustomer}`)
        .then((res)=>{
                console.log(res.data)
                if(res.data !== false){
                    setLoadingCheckEmail(false)
                    setEmailState(true)
                }else {
                    console.log(emailCustomer)
                    setLoadingCheckEmail(true)
                    setshowModalEmailUnknown(true)
                    // alert('email blm terdaftar')
                }
        }).catch((err)=>{
            console.log(err)
        })
      }

      const changeEmail=()=>{
          setEmailCorrect(false)
          setshowModalEmailUnknown(false)
          setEmailCorrect(true)
          setLoadingCheckEmail(false)
      }

      const verifyOTP=()=>{
          console.log('otp nya ', otp,emailCustomer,passwordCustomer)
          
          axios.post(`https://customers.sold.co.id/customer-login-request?Email=${emailCustomer}&Password=${passwordCustomer}&otp=${otp}`)
          .then((res)=>{
            console.log(res.data)
            if(res.data){
                toast.error('Berhasil Login', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // dispatch(Login_Redux(res.data))
                var data = res.data
                dispatch(LoginRedux(data))
                navigate('/')
                
            }else {
                toast.error('Gagal Login, Check kembali Password/Email/Otp', {
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
              console.log(err)
          })
        }

        const kirim_ulang_otp=()=>{
            axios.post(`https://customers.sold.co.id/get-otp?Email=${emailCustomer}`)
            .then((res)=>{
                if(res.data){
                    toast.error('OTP Berhasil Dikirimkan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }else {
                    toast.error('OTP Gagal Terkirim', {
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
                console.log(err)
            })
        }
      const login_customer=()=>{
        if(emailCustomer && passwordCustomer ){
            axios.post(`https://customers.sold.co.id/get-otp?Email=${emailCustomer}`)
            .then((res)=>{
                console.log(res.data)
                if(res.data){
                    setShowModalOTP(true)
                   
                }else {
                    toast.error('OTP Gagal Terkirim', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
                
            }).catch((err)=>[
                console.log(err)
            ])
        }
      }
    return (
        <>
            {/* MODALS EMAIL BELUM TERDAFTAR */}
            <Modal
                show={showModalEmailUnknown}
                onHide={() => setshowModalEmailUnknown(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-content-unknown"
                >
                <Modal.Header closeButton className="modal-header-unknown">
                <Modal.Title className="modal-header-success-cart" id="example-custom-modal-styling-title">
                    <p>Email belum terdaftar</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-unknown">
                      <div className="box-lanjutkan-unknown">
                        <p>Lanjut daftar dengan email ini</p>
                        <p>{emailCustomer}</p>
                      </div>
                      <div className="btn-daftar-ubah">
                            <div className="btn-ubah-unknown" onClick={changeEmail}>
                                <p>Ubah</p>
                            </div>
                            <div className="btn-daftar-unknown">
                                <p>Ya,Daftar</p>
                            </div>
                      </div>
                </Modal.Body>
            </Modal>
            {/* MODALS EMAIL BELUM TERDAFTAR */}

            {/* MODALS OTP */}
            <Modal
                show={showModalOTP}
                onHide={() => setShowModalOTP(false)}
                dialogClassName="modal-90w"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-content-unknown"
                >
                <Modal.Header closeButton className="modal-header-unknown">
                <Modal.Title className="modal-header-success-cart" id="example-custom-modal-styling-title">
                    <p>Masukan OTP</p>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-unknown">
                    <OtpInput
                        value={otp}
                        onChange={handleChangeOtp}
                        numInputs={8}
                        separator={<span>-</span>}
                        className="otp-input"
                    />
                    <div className="box-for-verify">
                        <div className="box-verify" onClick={verifyOTP}>
                            <p>Verify OTP</p>
                        </div>
                        <p>OTP tidak diterima? <span onClick={kirim_ulang_otp}>Kirim Ulang</span></p>
                    </div>
                </Modal.Body>
            </Modal>
            {/* MODALS OTP END */}
        {
            emailState ?
            <>
                <div className="box-container-login">
                    <div className="box-solped-logo container">
                        <Link to="/" className="box-img-login">
                            <ImgEffect
                                data={{
                                    img:logo_soldays,
                                    background:'transparent'
                                }}
                            />
                        </Link>
                    </div>
                    <div className="box-solped-isi container">
                        <div className="box-card-login">
                            <div className="card-login">
                                <div className="box-top-detail-login">
                                    <p>Masuk</p>
                                    <p>Daftar</p>
                                </div>
                                <div className="box-input-email-login">
                                    <p>Email</p>
                                    <div className="email-keisi-login">
                                        <input type="email" className="input-email-keisi" value={'darmawanbayu1@gmail.com'} onChange={(e)=>onInputEmail(e.target.value)} />
                                        <p id="id_back_login" onClick={()=>backToDefault(false)}>Ubah</p>
                                    </div>
                                </div>
                                <div className="box-input-email-login">
                                    <p>Password</p>
                                    <div className="password-keisi-login" tabIndex={0}>
                                        {
                                            lihatPassword ? 
                                            <>
                                                <BsFillEyeSlashFill className="icon-mata" onClick={()=>setLihatPassword(false)}/>
                                                <input type="password" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                            </>
                                            : 
                                            <>
                                                <IoEyeSharp className="icon-mata" onClick={()=>setLihatPassword(true)}/>
                                                <input type="text" className="input-email-keisi testing" onChange={(e)=>onInputPassword(e.target.value)} />
                                            </>
                                        }
                                        
                                        {/* <input type="email" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} /> */}
                                        
                                    </div>
                                    {/* <p>Contoh:email@soldays.com</p> */}
                                </div>
                                <div className="btn-selanjutnya-login">
                                    <p>Lupa Kata Sandi?</p>
                                    <div className="btn-next-login active-login" onClick={login_customer}> 
                                        <p>Login</p>   
                                    </div>
                                </div>
                                <div className="login-with-another">
                                    <div className="box-garis-login">

                                    </div>
                                    <p>atau masuk dengan</p>
                                    <div className="box-garis-login">

                                    </div>
                                </div>
                                <div className="google-btn-box-login">
                                    <div className="btn-google">
                                        {
                                            showloginButton ? 
                                            <GoogleLogin
                                                clientId={oathClientID}
                                                buttonText="Google"
                                                onSuccess={onLoginSuccess}
                                                onFailure={onLoginFailure}
                                                cookiePolicy={'single_host_origin'}
                                                className="btn-google-real"
                                            /> : null

                                        }
                                        {showlogoutButton ? 
                                            <GoogleLogout
                                            clientId={oathClientID}
                                            buttonText="Sign Out"
                                            onLogoutSuccess={onSignoutSuccess}
                                            className="btn-google-real"
                                            >
                                            </GoogleLogout>
                                            : 
                                            null
                                        }
                                    </div>
                                    
                                </div>
                                <div className="box-bantuan-login">
                                    <p>Butuh bantuan? <span>Hubungi Soldays Care</span></p>
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
            :
            <> 
            {/* page kebuka masuk ke false dulu buat check email kalo bener state berubah jd true */}
                <div className="box-container-login">
                    <div className="box-solped-logo container">
                        <Link to="/" className="box-img-login">
                            <ImgEffect
                                data={{
                                    img:logo_soldays,
                                    background:'transparent'
                                }}
                            />
                        </Link>
                    </div>
                    <div className="box-solped-isi container">
                        <div className="box-card-login">
                            <div className="card-login">
                                <div className="box-top-detail-login">
                                    <p>Masuk</p>
                                    <p>Daftar</p>
                                </div>
                                {
                                    emailCorrect ? 
                                    <>
                                        <div className="box-input-email-login">
                                            <p>Email</p>
                                            <input type="email" className="input-email-login" onChange={(e)=>onInputEmail(e.target.value)} />
                                            <p>Contoh:email@soldays.com</p>
                                        </div>
                                        <div className="btn-selanjutnya-login">
                                            <p>Lupa Kata Sandi?</p>
                                            {loadingCheckEmail ? 
                                                <div className="btn-next-login active-login">
                                                    <BeatLoader color={color} loading={loading} css={override} size={20} />
                                                    {/* <p>Selanjutnya</p>       */}
                                                </div>
                                                :
                                                <div className="btn-next-login active-login" onClick={onCheckEmailLogin}>
                                                    <p>Selanjutnya</p>      
                                                </div>
                                            }
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="box-input-email-login">
                                            <p>Email</p>
                                            <input type="email" className="input-email-login"  onChange={(e)=>onInputEmail(e.target.value)} />
                                            <p>Contoh:email@soldays.com</p>
                                        </div>
                                        <div className="btn-selanjutnya-login">
                                            <p>Lupa Kata Sandi?</p>
                                            <div className="btn-next-login disabled">
                                                <p>Selanjutnya</p>
                                            </div>
                                        </div>
                                    </>

                                }
                                <div className="login-with-another">
                                    <div className="box-garis-login">

                                    </div>
                                    <p>atau masuk dengan</p>
                                    <div className="box-garis-login">

                                    </div>
                                </div>
                                <div className="google-btn-box-login">
                                    <div className="btn-google">
                                        {
                                            showloginButton ? 
                                            <GoogleLogin
                                                clientId={oathClientID}
                                                buttonText="Google"
                                                onSuccess={onLoginSuccess}
                                                onFailure={onLoginFailure}
                                                cookiePolicy={'single_host_origin'}
                                                className="btn-google-real"
                                            /> : null

                                        }
                                        {showlogoutButton ? 
                                            <GoogleLogout
                                            clientId={oathClientID}
                                            buttonText="Sign Out"
                                            onLogoutSuccess={onSignoutSuccess}
                                            className="btn-google-real"
                                            >
                                            </GoogleLogout>
                                            : 
                                            null
                                        }
                                    </div>
                                    
                                </div>
                                <div className="box-bantuan-login">
                                    <p>Butuh bantuan? <span>Hubungi Soldays Care</span></p>
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
        }
           
        </>
    )
}