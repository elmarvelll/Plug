import "swiper/css"
import "swiper/css/pagination"
import './styles/App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './Approutes'



function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}
export default App
