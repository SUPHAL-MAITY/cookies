import React,{useState} from 'react'
import '../App.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [phone,setPhone]=useState("")
  const navigate=useNavigate()

  const apiUrl = process.env.REACT_APP_API_URL;



const handleSubmit=async(e)=>{
  e.preventDefault()

  try {
    const res=await axios.post(`${apiUrl}/api/v1/login`,{phone},{ withCredentials: true })
    console.log(res)
    navigate("/otp")

    
  } catch (error) {
    console.log(error)
    
  }
}






  return (
  <>


<div className="login_form_container">
<div className="wrapper">
    <form  onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div className="input-field">
        <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
        <label>Enter your phone number</label>
      </div>
     
     
      <button type="submit">Log In</button>
      
    </form>
  </div>

</div>
 

  
  
  </>

  )
}

export default Login
