import React, { useState } from 'react'
import './testing.css'

export default function Testing(){

    // const [corrections,setCorrections]=useState({
    //     'wierd':'weird',
    //     'realy':'really'
    // })

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
    return (
        <>
            <div className="container">
                <p>AUTOCORRECT</p>
                <div className="text-center">
                    <textarea data-testid="textarea" rows={10} cols={80} value={finalAnswer} className="card" onChange={(e)=>checking_correct(e.target.value)} />
                </div>
            </div>
        </>
    )
}