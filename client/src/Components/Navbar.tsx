import Navlink from "./Navlinks"
import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import '../styles/Navbar.css'
import { VerifContext } from "../Approutes"
import axios from "axios"
import { cartSettings } from "../utils/cartProvider"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"



function Navbar() {
    const [activePath, setactivePath] = useState<string>('/')
    const [scrolled, setScrolled] = useState(false);
    const [businessNoti, setbusinessNoti] = useState(false);
    const location = useLocation()
    const verif = useContext(VerifContext)
    if (!verif) throw new Error('no verif_state provided')
    const { setsearchtext } = verif
    const settings = cartSettings()
    if (!settings) throw new Error('no cart_state provided')
    const { setcart, total, setnotifications, setbusinessnotifications } = settings
    const [text, settext] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/user/unread_notifications')
            .then((res) => {
                setnotifications(res.data.Notification)
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/business/unread_notifications')
            .then((res) => {
                if (res.data.Notification.length > 0) {
                    setbusinessNoti(true)
                }
                else { setbusinessNoti(false) }
            })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:3000/cart/products', { Link: '/' } as Axios_Req_With_Url)
            .then((res) => {
                setcart(res.data.products)
            })
    }, [])

    const urlpath = location.pathname
    const linkroutes = [
        { class: 'navigation_link', URL: '/my_account', name: "Account", toOtherUrl: true },
        { class: 'navigation_link', URL: '', name: 'Cart', toOtherUrl: false },
        { class: 'navigation_link', URL: 'new business', name: "My business", toOtherUrl: false },
        // { class: 'navigation_link', URL: 'new business', name: "Add Business", toOtherUrl: false }

    ]

    useEffect(() => {
        if (text === '') {
            const timeout = setTimeout(() => {
                setsearchtext(null)
            }, 1000);
            return () => clearTimeout(timeout)
        }
    }, [text])

    function ChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        settext(value)
        if (value === '') {

        }
    }
    function submitSearch() {
        console.log('search submitted')
        setsearchtext(text)
    }

    return (
        <div className={scrolled ? 'scrollnavbar' : 'fixednavBar'}>
            <Link to={'/'}>
                <h2 className="" style={{ color: '#A6ACB8',fontWeight:'bold' }}>Kart <span className="title_tilted">X</span></h2>
            </Link>
            <div style={{ display: 'flex' }}>
                <div className="intro_search_div"><input autoComplete='off' type="search" name="intro_search" id="intro_search" onChange={ChangeEvent} value={text} placeholder="Search" /></div>
                <button className="AddButton" style={{ fontSize: 'small', margin: 'auto', padding: '5px', borderRadius: '5px' }} onClick={submitSearch}>Search</button>
            </div>
            <div className="nav_divs">
                <div className="nav_links">
                    <div className="links">
                        {linkroutes.map((link, index) => {
                            return <div key={index} style={{ all: "unset", display: "contents" }}>
                                <Navlink class={link.class} URL={link.URL} name={link.name} isActive={link.URL === urlpath} toOtherUrl={link.toOtherUrl} setActive={() => setactivePath(link.URL)} total={total} isNoti={businessNoti} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Navbar