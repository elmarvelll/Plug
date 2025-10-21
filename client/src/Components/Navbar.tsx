import Navlink from "./Navlinks"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import '../styles/Navbar.css'
import { VerifContext } from "../Approutes"
import axios from "axios"
import { cartSettings } from "../utils/cartLayout"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"



function Navbar() {
    const [activePath, setactivePath] = useState<string>('/')
    const [total, settotal] = useState<number>(0)
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation()
    const verif = useContext(VerifContext)
    const isVerified = verif?.isVerified
    const settings = cartSettings()
    if (!settings) throw new Error('no cart_state provided')
    const { cart, setcart } = settings
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        settotal(cart.reduce((sum, item) => {
            return sum + item.price
        }, 0))
    }, [cart])


    useEffect(() => {
        axios.get('http://localhost:3000/cart/products', { Link: '/' } as Axios_Req_With_Url)
            .then((res) => {
                setcart(res.data.products)
            })
    }, [])


    const urlpath = location.pathname
    const linkroutes = [
        { class: 'navigation_link', URL: '/', name: 'Home', toOtherUrl: true },
        { class: 'navigation_link', URL: '/My_buisness', name: "Account", toOtherUrl: true },
        { class: 'navigation_link', URL: '/Services', name: 'Cart', toOtherUrl: false },
        { class: 'navigation_link', URL: 'new business', name: "My business", toOtherUrl: false }
    ]

    return (
        <div className={scrolled ? 'scrollnavbar' : 'fixednavBar'}>
            <h2 className="" style={{ color: 'white' }}>Plug</h2>
            <div className="nav_divs">
                <div className="nav_links">
                    <div className="links">
                        {linkroutes.map((link, index) => {
                            return <div key={index} style={{ all: "unset", display: "contents" }}>
                                <Navlink class={link.class} URL={link.URL} name={link.name} isActive={link.URL === urlpath} toOtherUrl={link.toOtherUrl} setActive={() => setactivePath(link.URL)} total={total} />
                                {/* <span style={{ marginBottom: 'auto' }}>|</span> */}
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Navbar