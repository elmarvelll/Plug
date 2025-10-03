import axios from "axios"
import { useEffect } from "react"
import '../styles/addBuisness.css'
import serviceLogo from '../assets/533259843_4011852219070297_796811363612180999_n.jpg'
import buisnessLogo from '../assets/536100576_1415034006270854_8213066235169458539_n.png'
import { useLocation, useNavigate } from "react-router-dom"
import { motion, useAnimation } from 'framer-motion'
import { type Axios_Req_With_Url } from "../utils/config/axios_config"

function addBuisness() {
    const location = useLocation()
    const navigate = useNavigate()
    const controls = useAnimation()

    useEffect(() => {
        axios.get('http://localhost:3000/auth', { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
    }, [])

    async function fadeOut(string: string) {
        await controls.start({ opacity: 0, y: 150 })
        navigate(`${location.pathname}/${string}?page=1`)
    }

    return (
        <div className="regform">
            <motion.div className="reg_firstPage"
                animate={controls}
                transition={{
                    duration: 0.7
                }}
            >
                <div className="regHeader">
                    <div>What would you like to host ?</div>
                </div>
                <div className="reg_options">
                    <motion.div onClick={() => fadeOut('buisness_registration')}>
                        <img src={buisnessLogo} alt="" />
                        <p>Business</p>
                    </motion.div>
                    <motion.div onClick={() => fadeOut('service_registration')}>
                        <img src={serviceLogo} alt="" />
                        <p>Services</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}
export default addBuisness 