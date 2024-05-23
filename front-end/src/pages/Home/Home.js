import React from 'react'
import Popular from '../../components/Popular/Popular.jsx'
import SlidingBanner from '../../components/SlidingBanner/SlidingBanner.js'

import './Home.css'

function Home() {
  return (
    <div className='home'>
      <SlidingBanner />
      <Popular category = {"Phone"}/>
      <Popular category = {"Laptop"}/> 
      <Popular category = {"Tu lanh"}/> 
      <Popular category = {"May giat"}/> 
      <Popular category = {"Dieu hoa"}/>
      <Popular category = {"TV"}/>
      <Popular category = {"SmartHome"}/>           
  
   
    </div>
  )
}

export default Home;