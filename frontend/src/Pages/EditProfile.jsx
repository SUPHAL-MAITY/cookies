import React from 'react'

const EditProfile = () => {
  return (
    <div className="profile_card">
     
      <div className="profile_image">
        <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF-Ius0UDBXH021y_GEQWeViF7AlOaqv2VLZ1IdZdndTTgBZJBuqSufZUbQKkoCv9DBfc&usqp=CAU" alt=''/>
      </div>




      {/* control form here  */}

      
      <div className="profile_form_container">
        <form action="">
          <div className="name inputs">
            <label htmlFor='name_form' > Name  </label>
            <input type='text' id='name_form' placeholder='Enter your name' />
           
          </div>
          <div className="contacts inputs">
            <div className="email_container">
                <label htmlFor='email_form' > Email </label>
                <input type='email' id='email_form' placeholder='Enter your email' />
            </div>
            <div className="phone_container">
                <label htmlFor='phone_form' > Phone </label>
                <input type='number' id='phone_form' placeholder='Enter your name' />
            </div>

          </div>

          <div className="passwords_container inputs">

          <div className="pwd_container">
                <label htmlFor='password_form' > Password</label>
                <input type='password' id='password_form' placeholder='Enter your  password' />
            </div>
            <div className="confirm_password_container">
                <label htmlFor='cnf_pwd_form' > Confirm password </label>
                <input type='password' id='cnf_pwd_form' placeholder='Confirm password' />
            </div>

        

          </div>
          <div className="">
                <label htmlFor='cnf_pwd_form' > Confirm password </label>
                <input type='password' id='cnf_pwd_form' placeholder='Confirm password' />
            </div>


          <div className="form_submit_btn">
            <button>Submit</button>
          </div>


        </form>

      </div>
      
     
    </div>
  )
}

export default EditProfile
