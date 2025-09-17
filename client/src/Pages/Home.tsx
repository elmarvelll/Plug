import BusinessesLayout from '../Components/BusinessLayout'
import Intro from '../Components/Intro'
import Footer from '../Components/Footer'
import { useEffect, useState, useContext } from 'react'
import { VerifContext } from '../Approutes'
const body = document.body




function Home() {
     const verif = useContext(VerifContext)
     const isVerified = verif?.isVerified

     useEffect(() => {
          window.history.scrollRestoration = "manual"; // Disable browser's auto-scroll
          window.scrollTo(0, 0,);
     }, [])
     body.style.position = 'relative'
     const [layout, showlayout] = useState(false)
     setTimeout(() => {
          showlayout(true)
     }, 1000);

     useEffect(() => {
          async function refreshtoken() {
               try {
                    console.log(isVerified)
                    if (!isVerified) {
                         console.log('expired token')
                    }
                    else {
                         console.log('there is a token')
                    }

               } catch (error) {

               }
          }
          refreshtoken()
     }, [isVerified])

     return (
          <>
               <Intro />
               {layout && (
                    <>
                         <BusinessesLayout />
                         <Footer />
                    </>
               )}
          </>
     )
}

export default Home