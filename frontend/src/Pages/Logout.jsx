import React from 'react'

const Logout = () => {
  return (
    <>


<div className="logout_form_container">
<div className="wrapper">
    <form action="#">
      <h2>Logout</h2>
        <div className="input-field">
        <input type="text" required/>
        <label>Enter your email</label>
      </div>
      <div className="input-field">
        <input type="password" required/>
        <label>Enter your password</label>
      </div>
      <div className="forget">
        <label htmlFor="remember">
          <input type="checkbox" id="remember"/>
          <p>Remember me</p>
        </label>
        <a href="#">Forgot password?</a>
      </div>
      <button type="submit">Log In</button>
      <div className="register">
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
    </form>
  </div>

</div>
 

  
  
  </>
  )
}

export default Logout
