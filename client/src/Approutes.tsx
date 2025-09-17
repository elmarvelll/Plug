import Home from './Pages/Home'
import AddBuisness from './Pages/addBuisness'
import Mybusiness from './Pages/mybusiness'
import SignUp from './Components/SignUp'
import Login from './Components/login'
import Services from './Pages/Services'
import Navbar from './Components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, createContext } from 'react'
import { AnimatePresence } from 'framer-motion'
import BusinessRegForm from './Pages/BusinessregForm'
import axios_config from './utils/config/axios_config'


type VerifContextType = {
  isVerified: boolean | null;
  setIsverified: React.Dispatch<React.SetStateAction<boolean | null>>;
};
export const VerifContext = createContext<VerifContextType | null>(null)


function AppRoutes() {
  const [closeclicked, setcloseclicked] = useState<boolean>(false)
  const [isVerified, setIsverified] = useState<boolean | null>(null)
  const location = useLocation()
  axios_config()

  const state = location.state
  const notNavlinks = ['/login', '/signup', "/new%20buisness", '/My_buisness', '/new%20buisness/buisness_registration']
  const showNavbar = !notNavlinks.includes(location.pathname)

  function closeState() {
    setcloseclicked(closeclicked => {
      closeclicked = !closeclicked
      const body = document.body

      if (closeclicked) {
        body.style.position = 'fixed'
      }
      else {
        body.style.position = 'relative'
      }
      return closeclicked
    })
  }

  return (
    <>
      <VerifContext.Provider value={{ isVerified, setIsverified }}>
        {showNavbar && <Navbar closeState={closeState} />}
        <AnimatePresence mode='wait'>
          <Routes location={state?.backgroundLocation || location}>
            <Route path='/' element={<Home />} />
            <Route path='/new buisness' element={<AddBuisness />} />
            <Route path='/new buisness/buisness_registration' element={<BusinessRegForm />} />
            <Route path='/My_buisness' element={<AddBuisness />} />
            <Route path='/buisnesses/:buisness' element={<Mybusiness />} />
            <Route path='/Services' element={<Services closeState={closeState} />} />
            <Route path='/login' element={<Login closeState={closeState} />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </AnimatePresence>

      </VerifContext.Provider >
    </>
  )
}

export default AppRoutes