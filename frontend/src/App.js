
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';


import Panel from './Pages/Panel.jsx';
import Category from './Pages/Category.jsx';

import Layout from './Components/Layout/Layout.jsx';
import Home from './Pages/Home.jsx';
import Blogs from './Pages/Blogs.jsx';
import SingleBlog from './Pages/SingleBlog.jsx';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import ResponsiveSidebar from './Components/Layout/ResponsiveSidebar.jsx';
import Users from './Pages/Users.jsx';
import EditProfile from './Pages/EditProfile.jsx';
import Landing from './Pages/Landing.jsx';
import RecentBlogs from './Pages/RecentBlogs.jsx';
import OtpInput from './Pages/otpInput.jsx';
import BlogEdit from './Pages/BlogEdit.jsx';


function App() {
  return (
    

<Routes>

    
       
      


       <Route   element={<ResponsiveSidebar/>}>
            <Route path="/dashboard" element={<Panel/>} />
            <Route path="/category" element={<Category/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/edit" element={<EditProfile/>} />
           
           

       </Route>

       <Route   element={<Layout/>}>
            <Route  path="/" element={<Landing/>} />
            <Route  path="/blogs" element={<Home/>} />
            {/* <Route  path="/blogs" element={<Blogs/>} /> */}
            <Route  path="/single-blogs/:id" element={<SingleBlog/>} />
            <Route  path="/login" element={<Login/>} />
            <Route  path="/signup" element={<Signup/>} />
            <Route path="/otp" element={<OtpInput/>} />
            <Route path="/create-blog" element={<BlogEdit/>} />
           
          
       </Route>


     




       
        
</Routes>
   
    
  );
}

export default App;
