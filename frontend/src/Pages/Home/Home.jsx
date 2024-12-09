import React from 'react'
import PopularProduct from '../../Components/PopularProduct/PopularProduct';
import CookieBanner from '../../Components/CookieBanner/CookieBanner';

const Home = () => {
  return (
    <div>
        <CookieBanner />
        <PopularProduct/>
    </div>
  )
}

export default Home