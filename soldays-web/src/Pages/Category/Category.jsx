import React, { useEffect,useState } from 'react';
import '../../Styles/Category.scss'
import Header from '../Header/Header';
import Footer from '../../Component/Footer/Footer';
import Gopay from '../../Assets/tokped_gambar/gopay-icon.png'
import { useParams } from "react-router-dom";

export default function Category(){

    const [allDataCategory,setAllDataCategory]=useState(undefined)


    return (
        <>
            <div className="container-allcategory">
                <div className="box-main-header">
                    <Header/>
                </div>
                <div className="box-main-category">
                    <div className="box-container-detail">
                        <p>ALL CATEGORY</p>
                    </div> 
                    <div className="box-card-category">
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant SEALANT SEALANT SEALANT</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
                        <div className="smallcard-category">
                            <div className="img-category">
                                <img src={Gopay} alt="" />
                            </div>
                            <p>Sealant</p>
                        </div> 
           
                    </div>
                </div>
                <div className="box-main-footer">
                    <Footer/>
                </div>
            </div>
        </>
    )
}