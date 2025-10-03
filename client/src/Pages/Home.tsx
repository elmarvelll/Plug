import BusinessesLayout from '../Components/BusinessLayout'
import Intro from '../Components/Intro'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import HomePageSlides from '../Components/HomePageSlides'
import { useEffect, useState } from 'react'




function Home() {
     useEffect(() => {
          window.history.scrollRestoration = "manual";
          window.scrollTo(0, 0,);
     }, [])
     const [layout, showlayout] = useState(false)
     setTimeout(() => {
          showlayout(true)
     }, 1000);

     return (
          <>
               <Intro />
               <Categories />
               <HomePageSlides />
               {layout && (
                    <>
                         <Footer />
                    </>
               )}
          </>
     )
}

export default Home