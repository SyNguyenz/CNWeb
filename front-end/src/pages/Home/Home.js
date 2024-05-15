import React from 'react'
import Popular from '../../components/Popular/Popular.jsx'
import SlidingBanner from '../../components/SlidingBanner/SlidingBanner.js'

import './Home.css'

function Home() {
  return (
    <div className='home'>
      <SlidingBanner />
      <Popular/>  
    </div>
  )
}

export default Home;