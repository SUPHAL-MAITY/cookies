import React from 'react'

const Landing = () => {
  return (
    <>
  <main>
    <section className="landing_categories">
        <h1 className='categories_title'>
            Welcome to eBlog 
        </h1>
     
        
        <div className="categories">
            <div className="category_box">
                <img src="politics_black and white.png" alt="" />
            </div>
            <div className="category_box">
                <img src="sports.png" alt="" />
            </div>
            <div className="category_box">
                <img src="business_black and white.png " alt="" />
            </div>
            <div className="category_box">
                <img src="food.png" alt="" />
            </div>
            <div className="category_box">
                <img src="tech.png" alt="" />
            </div>
            <div className="category_box">
                <img src="lifestyle.png" alt="" />
            </div>
            <div className="category_box">
                <img src="health.png" alt="" />
            </div>
            <div className="category_box">
                <img src="travel.png" alt="" />
            </div>


        </div>
        

    </section>

    <section className="landing_quote">
        <div className="landing_quote_icon">
            <img src="book.png" alt=""  id='landing_quote_img'/>
        </div>
        <div className="landing_quote_text">
            <h1>“If we encounter a man of rare intellect, we should ask him what books he reads.” </h1>
            <h3>― Ralph Waldo Emerson</h3>
        </div>
    </section>

    

  </main>
 

      
    </>
  )
}

export default Landing
