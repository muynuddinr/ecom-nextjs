import React from 'react'
import Navbar from './Components/navbar'
import Footer from './Components/footer'
import Banner from './Components/banner'
import TopPicks from './Components/toppicks'
const page = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <TopPicks />
      <Footer />
    </div>
  )
}

export default page
