import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from"axios"


const SingleBlog = () => {
  const {id}=useParams()
  const apiUrl = process.env.REACT_APP_API_URL;

  const [blog,setBlog]=useState([])


 const  fetchSingleBlog=async()=>{

  try {
    const { data } = await axios.get(`${apiUrl}/api/v1/user/single-blog/${id}`);
    setBlog(data?.data)
    console.log(data?.data);
  } catch (error) {
    console.error(error)
  }

  }

  useEffect(()=>{
    fetchSingleBlog()

  },[id])

 

  return (
    <>
    <div>
      <div className="container">
        <div className="single_blog_title_container">
          <h2 className='cat_titile'> {blog.category} </h2>
          <h1 className="title_single_blog">{blog?.title}</h1>
          <div className="author_container">By {blog?.author ? blog?.author?.name:"Unknown"} <span>Nov 19, 2024</span></div>
        </div>
        <div className="banner">
          {/* <img src="https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  alt=''  /> */}
          <img
            src={blog.imageUrl}
            alt=""
          />
        </div>

        <div className="card_container">

            <p className='para_blog'>
           {blog?.content}

            </p>


        </div>



        
      </div>
    </div>
  </>
  )
}

export default SingleBlog
