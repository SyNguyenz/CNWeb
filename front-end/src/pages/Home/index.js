import React from 'react'
import Popular from '../../components/Popular/Popular.jsx'
import './Home.css'
import Header from '../../components/Header';

function Home() {
  return (
    <div className='home'>
      <Header/>
      <Popular/>  
    </div>
  )
}

export default Home;