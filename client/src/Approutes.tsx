import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import Home from './Pages/Home'
import AddBuisness from './Pages/addBuisness'
import Mybusiness from './Pages/mybusiness'
import SignUp from './Components/SignUp'
import Login from './Components/login'
import Account from './Pages/Account'
import Navbar from './Components/Navbar'
import BusinessRegForm from './Pages/BusinessregForm'
import axios_config from './utils/config/axios_config'
import axios from 'axios'
import BusinessPage from './Pages/BusinessPage'
import CartProvider from './utils/cartProvider'

type VerifContextType = {
  isVerified: boolean | null;
  setIsverified: React.Dispatch<React.SetStateAction<boolean | null>>;
  searchtext: string | null;
  setsearchtext: React.Dispatch<React.SetStateAction<string | null>>;
};

export const VerifContext = createContext<VerifContextType | null>(null)

function AppRoutes() {
  const [isVerified, setIsverified] = useState<boolean | null>(null)
  const [searchtext, setsearchtext] = useState<string | null>(null)
  const location = useLocation()
  axios_config()


  useEffect(() => {
    axios.get('http://localhost:3000/verifyUser', { withCredentials: true })
      .then((res) => {
        if (res.data.error) setIsverified(false)
        if (res.data.isVerified) setIsverified(true)
      })
  }, [])


  const state = location.state
  const [notNavlinks,setnotnavlinks] = useState(['/login', '/signup', "/new%20business", '/my_account'])
  useEffect(() => {
    if (location.state && !notNavlinks.includes(location.state.URL)) {
      console.log(location.state.URL)
      setnotnavlinks(prev=>[...prev,location.state.URL])
    }
  }, [location.state])
  useEffect(() => {
    console.log(notNavlinks)
  }, [notNavlinks])
  const showNavbar = !notNavlinks.includes(location.pathname)

  return (
    <>
      <VerifContext.Provider value={{ isVerified, setIsverified, searchtext, setsearchtext }}>
        <CartProvider>
          {showNavbar && <Navbar />}
          <Routes location={state?.backgroundLocation || location}>
            <Route path='/' element={<Home />} />
            <Route path='/new business' element={<AddBuisness />} />
            <Route path='/new business/buisness_registration' element={<BusinessRegForm />} />
            <Route path='/my_account' element={<Account />} />
            <Route path='/mybusinesses/:business' element={<Mybusiness />} />
            <Route path='/businesses/:businessID' element={<BusinessPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </CartProvider>
      </VerifContext.Provider >
    </>
  )
}

export default AppRoutes