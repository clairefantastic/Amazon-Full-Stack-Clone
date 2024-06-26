import React from 'react'
import './Home.css';
import Product from "./Product";

function Home() {
  return (
    <div className="home">
        <div className="home__container">
            <img className="home__image" src="../images/amazon_home.jpg" />
            <div className="home__row">
                <Product 
                    id="12321341"
                    title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback" 
                    price={29.99} 
                    image="../images/the_lean_startup.jpg"
                    rating={5}
                />
                <Product 
                    id="49538094"
                    title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" 
                    price={239.0} 
                    image="../images/kenwood.jpg"
                    rating={4}
                />
            </div>

            <div className="home__row">
                <Product 
                    id="4903850"
                    title="Samsung Wired Headset Earphone for 3.5mm Jack - White"
                    price={8.85} 
                    image="../images/samsung_earphone.jpg"
                    rating={4}
                />
                <Product 
                    id="23445930"
                    title="Echo Dot (5th Gen, 2022 release) | With bigger vibrant sound, helpful routines and Alexa | Charcoal"
                    price={49.99} 
                    image="../images/echo_dot.jpg"
                    rating={5}
                />
                <Product 
                    id="3254354345"
                    title="2021 Apple iPad Pro (12.9-inch, Wi‑Fi, 128GB) - Space Gray (Renewed)"
                    price={649.95} 
                    image="../images/iPad.jpg"
                    rating={4}
                />
            </div>

            <div className="home__row">
                <Product 
                    id="90829332"
                    title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
                    price={1094.98} 
                    image="../images/samsung_ultra.jpg"
                    rating={4}
                />
            </div>
        </div>
    </div>
  )
}

export default Home
