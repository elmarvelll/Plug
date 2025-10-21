import Intro from '../Components/Intro'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import HomePageSlides from '../Components/HomePageSlides'
import { createContext, useContext, useEffect, useState } from 'react'
import BusinessRegForm from './BusinessregForm'
import ProductPage from './ProductsPage'
import CartLayout, { cartSettings } from '../utils/cartLayout'
import CheckoutPage from '../Components/CheckoutPage'



type addStateType = {
     addState: boolean | null;
     setAddState: React.Dispatch<React.SetStateAction<boolean | null>>;
     homescrollheight: number | undefined
     setscrollHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
     Component: string | null
     setComponent: React.Dispatch<React.SetStateAction<string | null>>
     businessId: string | null
     setBusinessId: React.Dispatch<React.SetStateAction<string | null>>
     product: string | null
     setproduct: React.Dispatch<React.SetStateAction<string | null>>

};

export const stateContext = createContext<addStateType | null>(null)

function Home() {
     const body = document.body
     const [addState, setAddState] = useState<boolean | null>(false)
     const [Component, setComponent] = useState<string | null>('')
     const [homescrollheight, setscrollHeight] = useState<number | undefined>(0)
     const [businessId, setBusinessId] = useState<string | null>('')
     const [product, setproduct] = useState<string | null>('')
     const settings = cartSettings()
     if (!settings) throw new Error('no state provided')
     const { viewCart,scrollheight,setviewcart } = settings

     useEffect(() => {
          window.history.scrollRestoration = "manual";
          window.scrollTo(0, 0,);
     }, [])

     const [layout, showlayout] = useState(false)
     setTimeout(() => {
          showlayout(true)
     }, 1000);

     function checkclickState(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
          if (event.target === event.currentTarget) {
               setAddState(false)
               setviewcart(false)
          }
     }
     useEffect(() => {
          if (addState || viewCart) {
               body.style.overflow = 'hidden'
          }
          else {
               body.style.overflow = 'scroll'
          }
     }, [addState, viewCart])

     return (
          <stateContext.Provider value={{ addState, setAddState, homescrollheight, setscrollHeight, Component, setComponent, product, setproduct, businessId, setBusinessId }}>
               <Intro />
               <Categories />
               <HomePageSlides />
               {layout && (
                    <>
                         <Footer />
                    </>
               )}
               {addState &&
                    <div className='addState_cover' onClick={checkclickState} style={{ position: 'absolute', top:homescrollheight }}>
                         {Component === 'regform' && <BusinessRegForm />}
                         {Component === 'product' &&
                              <ProductPage product={product} businessId={businessId} />
                         }
                    </div>
               }
               {viewCart &&
                    <div className='checkOut_div' onClick={checkclickState} style={{ top: scrollheight }}>
                         <CheckoutPage />
                    </div>
               }

          </stateContext.Provider>
     )
}

export default Home