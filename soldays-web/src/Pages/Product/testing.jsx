import React, { useState,useEffect } from 'react'
import './testing.css'
import '../../Styles/testing.scss'

import axios from 'axios'

export default function Testing(){

    // const [corrections,setCorrections]=useState({
    //     'wierd':'weird',
    //     'realy':'really'
    // }),useEffe

    useEffect(()=>{
        fetching()
    },[])
    const fetching =()=>{

        let alldata = [
            {
                a:'asdasdadsa',
                b:'asdadasdadas',
                c:'asdadasdads',
                list_data:[
                    {
                        key:'asdadadsa',
                        city:'asdasdad'
                    },
                    {
                        key:'asdadadsa',
                        city:'asdasdad'
                    },
                    {
                        key:'asdadadsa',
                        city:'asdasdad'
                    },
                    {
                        key:'asdadadsa',
                        city:'asdasdad'
                    },

                ]
            }
        ]
        let provinsi = alldata.list_data

       

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://data.covid19.go.id/public/api/prov.json", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
          
        
    //     axios.get(`https://data.covid19.go.id/public/api/prov.json`)
    //     .then((res)=>{
    //         console.log(res.data)
    //         // console.log(res.data.list_data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    }

    const [corrections,setCorrections]=useState([
        {
            word:'wierd',
            correct:'weird'
        },
        {
            word:'realy',
            correct:'really'
        },
    ])

    const [defaultText,setDefaultText]=useState('')
    const [finalAnswer,setFinalAnswer]=useState('')
    // console.log(corrections)
    const checking_correct=(value)=>{
        console.log(value,'value')
        
        var correct_answer = ''
        var split_by_space = value.split(' ')
        console.log(split_by_space)
        setDefaultText(value)
        
        
        if(split_by_space.length > 0){
            // console.log('masuk ke if')
            
            var final_answer = ''
            split_by_space.forEach((valueSpace,index,array)=>{
                
                var findIndex = corrections.findIndex((val)=>{
                    if(val.word === valueSpace){
                        correct_answer = val.correct
                        return val.word === valueSpace
                    }else {
                        correct_answer = value
                        return -1
                    }
                })
                // split_by_space[index] = corrections[findIndex].correct
                
                if(findIndex !== -1){
                    if(index === array.length - 1){
                        split_by_space[index]=correct_answer

                        setFinalAnswer(split_by_space)
                    }
                }else {
                    setFinalAnswer(value)
                }
            })
            
        }else {      
        }

    }
    const [isFreight,setIsFreight]=useState(false)



    const onClickBtn=()=>{

        if(isFreight === true){
            setIsFreight(false)
        }else {
            setIsFreight(true)
        }
    }
    return (
        <>
            <div className="container-testing">
               <div className="box-bigger">
                   <div className="small-box" onClick={()=>onClickBtn()}>
                        Freight
                   </div>
                   {
                       isFreight ? 
                       <>
                        <div className="small-box">
                            freight menu
                        </div>
                        <div className="small-box">
                            freight menu    
                        </div>
                       </>
                       :
                       null

                   }
                    <div className="small-box">
                        trucking    
                    </div>

               </div>
               <div className="box-bigger">
                   
               </div>
               <div className="box-bigger">
                   
               </div>
               <div className="box-bigger">

                </div>

            </div>
        </>
    )
}