import React, { useState } from 'react'
import './login.css'
import {LogoLoginTokped,logo_soldays} from '../../Assets/Assets'
import ImgEffect from '../../Component/Effect/img_effect'
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import {IoEyeSharp} from 'react-icons/io5'
import {BsFillEyeSlashFill} from 'react-icons/bs'




export default function Login(){

    const [oathClientID,setOathClientID]= useState('624689136381-n8qrmrn7cfe16hfhdgurb0jqpjeevr1l.apps.googleusercontent.com')
    
    const responseGoogle = (response) => {
        console.log(response);
      }

      const [showloginButton, setShowloginButton] = useState(true);
      const [showlogoutButton, setShowlogoutButton] = useState(false);
      const [emailCorrect,setEmailCorrect]=useState(false) // input email udh ke isi atau belum
      const [emailState,setEmailState]=useState(true) // state untuk kalo email ke isi berarti masuk password muncul
      const [lihatPassword,setLihatPassword]=useState(false)
      const onLoginSuccess = (res) => {
          console.log('Login Success:', res.profileObj);
          setShowloginButton(false);
          setShowlogoutButton(true);
      };
  
      const onLoginFailure = (res) => {
          console.log('Login Failed:', res);
      };
  
      const onSignoutSuccess = () => {
          alert("You have been logged out successfully");
          console.clear();
          setShowloginButton(true);
          setShowlogoutButton(false);
      };
      function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

      const onInputEmail=(email)=>{
          console.log(email)
          var checking_email = validateEmail(email)
          console.log(checking_email)
          if(checking_email){
            setEmailCorrect(true)
          }else {
            setEmailCorrect(false)
              console.log('struktur email salah')
          }   
      }
      const onInputPassword=(password)=>{

      }
    return (
        <>
        {
            emailState ?
            <>
                <div className="box-container-login">
                    <div className="box-solped-logo container">
                        <div className="box-img-login">
                            <ImgEffect
                                data={{
                                    img:logo_soldays,
                                    background:'transparent'
                                }}
                            />
                        </div>
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
                                        <p>Ubah</p>
                                    </div>
                                </div>
                                <div className="box-input-email-login">
                                    <p>Password</p>
                                    <div className="password-keisi-login">
                                        {
                                            lihatPassword ? 
                                            <>
                                                <BsFillEyeSlashFill className="icon-mata" onClick={()=>setLihatPassword(false)}/>
                                                <input type="password" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                            </>
                                            : 
                                            <>
                                                <IoEyeSharp className="icon-mata" onClick={()=>setLihatPassword(true)}/>
                                                <input type="text" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                            </>
                                        }
                                        
                                        <input type="email" className="input-email-keisi" onChange={(e)=>onInputPassword(e.target.value)} />
                                        {/* <p>Ubah</p> */}
                                    </div>
                                    {/* <p>Contoh:email@soldays.com</p> */}
                                </div>
                                <div className="btn-selanjutnya-login">
                                    <p>Lupa Kata Sandi?</p>
                                    <div className="btn-next-login active-login">
                                        <p>Selanjutnya</p>
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
                        <div className="box-img-login">
                            <ImgEffect
                                data={{
                                    img:logo_soldays,
                                    background:'transparent'
                                }}
                            />
                        </div>
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
                                            <div className="btn-next-login active-login">
                                                <p>Selanjutnya</p>
                                            </div>
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