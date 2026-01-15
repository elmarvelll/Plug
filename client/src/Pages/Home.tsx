import Intro from '../Components/Intro'
import Footer from '../Components/Footer'
import Categories from '../Components/Categories'
import HomePageSlides from '../Components/HomePageSlides'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import BusinessRegForm from './BusinessregForm'
import ProductPage from './ProductsPage'
import CartLayout, { cartSettings } from '../utils/cartProvider'
import CheckoutPage from '../Components/CheckoutPage'
import { VerifContext } from '../Approutes'
import Category from './Category'
import burgerImg from '../assets/burgerImg.jfif'



type addStateType = {
     addState: boolean | null;
     setAddState: React.Dispatch<React.SetStateAction<boolean | null>>;
     homescrollheight: number | undefined
     category: string
     setcategory: React.Dispatch<React.SetStateAction<string>>
     Categorystate: boolean | null;
     setcategorystate: React.Dispatch<React.SetStateAction<boolean | null>>;
     sethomescrollHeight: React.Dispatch<React.SetStateAction<number | undefined>>;
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
     const [category, setcategory] = useState<string>('')
     const [Categorystate, setcategorystate] = useState<boolean | null>(false)
     const [Component, setComponent] = useState<string | null>('')
     const searchRef = useRef<HTMLDivElement>(null)
     const [homescrollheight, sethomescrollHeight] = useState<number | undefined>(0)
     const [businessId, setBusinessId] = useState<string | null>('')
     const [product, setproduct] = useState<string | null>('')
     const verif = useContext(VerifContext)
     if (!verif) throw new Error('no verif_state provided')
     const { searchtext } = verif
     const settings = cartSettings()
     if (!settings) throw new Error('no state provided')
     const { viewCart, scrollheight, setviewcart } = settings

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
          if (addState || viewCart || Categorystate) {
               body.style.overflow = 'hidden'
          }
          else {
               body.style.overflow = 'scroll'
          }
     }, [addState, viewCart, Categorystate])
     useEffect(() => {
          if (searchtext !== null) {
               if (searchRef.current)
                    searchRef.current.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start'
                    })
          }
     }, [searchtext])
     return (
          <stateContext.Provider value={{ addState, setAddState, homescrollheight, sethomescrollHeight, category, setcategory, Categorystate, setcategorystate, Component, setComponent, product, setproduct, businessId, setBusinessId }}>
               <Intro />
               <section style={{ padding: '0px 80px', boxSizing: 'border-box' }}>
                    <Categories />
                    <section ref={searchRef}>
                         <HomePageSlides />
                    </section>
                    {layout && (
                         <>
                              <Footer />
                         </>
                    )}
                    {addState &&
                         <div className='addState_cover' onClick={checkclickState} style={{ position: 'absolute', top: homescrollheight }}>
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
                    {Categorystate &&
                         <div className='category_cover' style={{ top: homescrollheight }}>
                              <Category Category={category} />
                         </div>
                    }
               </section>
               <div style={{width:'900px', height:'500px',backgroundColor:'red'}}>
                    <img src={burgerImg} alt="" />

               </div>
          </stateContext.Provider>

     )
}

export default Home