import React, { useState } from 'react'
import axios from "axios"
let obj={
    num1:"",
    num2:""
}
export default function Home() {
    let [data,setData]=useState(obj)
    let [ans,setans]=useState([])
    function handlinput(e){
        setData({...data,[e.target.name]:e.target.value})
    }
   async function handleSubmit(){

     let res= await  axios.post("http://localhost:8080/",data)
     console.log(res)
     setans([...res.data])
     
    }
  return (
    <div className='container'>
        <div className='headbox'>
            <h1>Step Addition</h1>
        </div>
        <div>
            <div className='form'>
                <div>
                    <p>First Number :</p>
                    <input type="number" name='num1' value={data.num1} onChange={(e)=>handlinput(e)} />
                </div>
                <div>
                    <p>Second Number :</p>
                    <input type="number" name='num2' value={data.num2} onChange={(e)=>handlinput(e)}/>
                </div>
               <div id="submitbox"> <button onClick={handleSubmit}>Genrate Steps</button></div>
            </div>
            <div style={{marginTop:"30px"}}>
            <div className='steps'>
                <div>
                        <span id='in'>{"{"}</span>
                    {   
                       
                        ans.map((e,index)=><div>
                            <span className='teal'> "step{index+1}"</span><span className='yellow'>: {"{"} "carryString": <span className='red'>"{e.carryString}"</span>, "sumString" : <span className='red'>"{e.sumString}"</span> {"}"}</span>
                        </div>)
                        
                    }
                    <span id='out'>{"}"}</span>
                </div>
                </div>
                </div>
        </div>
    </div>
  )
}
