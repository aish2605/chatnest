import React from 'react'
import '../css/Home.css'
import {useNavigate} from "react-router-dom"

function Home() {

  const navigate = useNavigate()

  return (
    <>
        <div className="container">
            <div className="first">
                <img src="/logo.png" width="200" style={{borderRadius:"12px"}}/>
                <h1 style={{textAlign:'center',color:'#cb6c98'}}>Welcome to the world of chatnest</h1>
                <p style={{fontSize:'22px',fontWeight:'600',color:'#cb6c98'}}>Chat without fear...</p>
                
                
                <button style={{height:'42px', width:'fit-content',padding:'6px',backgroundColor:'#471878',color:'white',cursor:'pointer',fontWeight:'600',fontSize:'20px',border:'none',borderRadius:'10px',
                  boxShadow:' 0 0 10px pink',border:'none',outline:'none'
                }} 
                onClick={()=>{navigate("/login")}}>Continue</button>
            </div>
        </div>
    </>
  )
}

export default Home