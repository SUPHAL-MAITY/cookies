import React, { useState } from 'react';
import "../styles/otpInput.css";
import axios from 'axios';
import Cookies from 'js-cookie';


const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // For 4 OTP fields

  const apiUrl = process.env.REACT_APP_API_URL;


 const handleSubmit=async()=>{
    console.log(otp.join(""))
    try {
     const {data} =await axios.post(`${apiUrl}/api/v1/verify`,{otp:otp.join("")}, { withCredentials: true })
     console.log(data)

      
    } catch (error) {
      
    }
 }




  // Handle OTP input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if the current one is filled
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Handle key down event to move to the previous input on backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            defaultValue={Cookies.get("otp")}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            autoFocus={index === 0} // Focus on the first input initially
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={otp.some(digit => digit === '')}
      >
        Submit
      </button>
    </div>
  );
};

export default OtpInput;