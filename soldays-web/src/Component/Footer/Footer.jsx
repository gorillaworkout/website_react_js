import React from 'react'
import './Footer.css'
import {GrFacebookOption,GrInstagram,GrTwitter,GrYoutube} from 'react-icons/gr'
import SmallCardSocialMedia from '../card/small_card_social_media'
import Iframe from 'react-iframe'
import {android_logo,bca_logo,bni_logo,bri_logo,citibank_logo,dbs_logo,mandiri_logo,permata_logo,shopee_logo} from '../../Assets/Assets'
import ImgEffect from '../Effect/img_effect'


export default function Footer(){

    var data_to_small_card_fb = {
        class:'box_for_socmed-1',
        icon:<GrFacebookOption id="icon_facebook_footer"/>,
        cardName:'facebook',
        cardNameClass:'soc_fb'
    }
    var data_to_small_card_ig = {
        class:'box_for_socmed-2',
        icon: <GrInstagram id="icon_instagram_footer"/>,
        cardName:'Instagram',
        cardNameClass:'soc_instagram'
    }
    var data_to_small_card_twitter = {
        class:'box_for_socmed-3',
        icon: <GrTwitter id="icon_twitter_footer"/>,
        cardName:'Twitter',
        cardNameClass:'soc_twitter'
    }
    var data_to_small_card_youtube = {
        class:'box_for_socmed-4',
        icon: <GrYoutube id="icon_youtube_footer"/>,
        cardName:'Youtube',
        cardNameClass:'soc_youtube'
    }
    const renderIframe=()=>{
        return(
            <>
                <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64991011.94983305!2d70.93156940000003!3d-6.166021600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f74d830cb1d3%3A0x20b08a88b0db891b!2sPT%20Solusi%20Digital%20Internusa%20(Soldays)!5e0!3m2!1sen!2sid!4v1638939606945!5m2!1sen!2sid"
                    width="550px"
                    height="350px"
                    id="myId"
                    className="maps-soldays"
                    display="initial"
                    position="relative"
                    />
            </>
            // <iframe src= width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            
        )
    }
    return (
        <>
            <div className="box-container-footer">
                <div className="container-footer-1">
                    <SmallCardSocialMedia data={data_to_small_card_fb}/>
                    <SmallCardSocialMedia data={data_to_small_card_ig}/>
                    <SmallCardSocialMedia data={data_to_small_card_twitter}/>
                    <SmallCardSocialMedia data={data_to_small_card_youtube}/> 
                </div>
                <div className="container-footer-2">
                    <div className="footer-2-isi">
                        <ul className="footer-2-isi-ul">
                            <li>
                                <h4 className="judul-footer-isi">SOLDAYS</h4>
                            </li>
                            <li>
                                <h4>Tentang Soldays</h4>
                            </li>
                            <li>
                                <h4>Hak Kekayaan</h4>
                            </li>
                            <li>
                                <h4>Intelektual</h4>
                            </li>
                            <li>
                                <h4>Karir</h4>
                            </li>
                            <li>
                                <h4>Blog</h4>
                            </li>
                            <li>
                                <h4>Soldays Parent</h4>
                            </li>
                            <li>
                                <h4>Mitra Blog</h4>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="container-footer-2">
                    <div className="footer-2-isi">
                        <ul className="footer-2-isi-ul">
                            <li>
                                <h4 className="judul-footer-isi">Bantuan dan Panduan</h4>
                            </li>
                            <li>
                                <h4>Soldays Care</h4>
                            </li>
                            <li>
                                <h4>Syarat dan Ketentuan</h4>
                            </li>
                            <li>
                                <h4>Kebijakan Privasi</h4>
                            </li>
 
                        </ul>
                    </div>
                </div>
                <div className="container-footer-2">
                    <div className="footer-2-isi">
                        <ul className="footer-2-isi-ul">
                            <li>
                                <h4 className="judul-footer-isi">Pembayaran</h4>
                            </li>
                        </ul>
                        <div className="box-logo-bank">
                            <div className="logo-bank-left">
                                <ul>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:bca_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:bni_logo,
                                                background:'transparent'
                                            }}
                                        />
                    
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:bri_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:citibank_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                  
                                </ul>
                            </div>
                            <div className="logo-bank-left">
                                <ul>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:mandiri_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:permata_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:shopee_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                    <li>
                                        <ImgEffect
                                            data={{
                                                img:dbs_logo,
                                                background:'transparent'
                                            }}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-footer-3">
                    <div className="box-for-iframe-maps">
                        {renderIframe()}
                    </div>
                    <div className="box-for-logo-app">
                        <img src={android_logo} alt="" />
                    </div>
                    <div className="box-for-footer-name">
                        <p>© 2021, PT. SOLUSI DIGITAL INTERNUSA.</p>
                    </div>
                </div>
            </div>
        </>
    )
}