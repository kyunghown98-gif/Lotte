import React from 'react'
import Header from './component/header'
import "./App.css"
import Hero_section from './component/Hero_section'
import Destinations from './component/Destinations'
import Special_Offers from './component/Special_Offers'
import Promotion from './component/Promotion'
import Our_Brand from './component/Our_Brand'
import Membership from './component/Membership'
import Banner from './component/Banner'
import Notice from './component/Notice'
import Seo from './component/Seo'
import Footer from './component/Footer'

function App() {

  return (
    <>
     <Header/>
     <Hero_section/>
     <Destinations/>
     <Special_Offers/>
     <Promotion/>
     <Our_Brand/>
     <Membership/>
     <Banner/>
     <Notice/>
     <Seo/>
     <Footer/>
    </>
  )
}

export default App
