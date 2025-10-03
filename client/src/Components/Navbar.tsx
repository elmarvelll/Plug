import Navlink from "./Navlinks"
import { useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import '../styles/Navbar.css'
import { VerifContext } from "../Approutes"



function Navbar() {
    const [activePath, setactivePath] = useState<string>('/')
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation()
    const verif = useContext(VerifContext)
    const isVerified = verif?.isVerified
    console.log(isVerified)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const urlpath = location.pathname
    const linkroutes = [
        { class: 'navigation_link', URL: '/', name: 'Home', toOtherUrl: true },
        { class: 'navigation_link', URL: '/Services', name: 'Message', toOtherUrl: true },
        { class: 'navigation_link', URL: '/My_buisness', name: "Account", toOtherUrl: true },
        { class: 'navigation_link', URL: 'new business', name: "My business", toOtherUrl: false }
    ]

    return (
        <div className={scrolled ? 'scrollnavbar' : 'fixednavBar'}>
            {/* <h1 className="LogoName">Plug</h1> */}
            <div className="nav_divs">
                <div className="nav_links">
                    <div className="links">
                        {linkroutes.map((link, index) => {
                            return <div key={index} style={{ all: "unset", display: "contents" }}>
                                <Navlink class={link.class} URL={link.URL} name={link.name} isActive={link.URL === urlpath} toOtherUrl={link.toOtherUrl} setActive={() => setactivePath(link.URL)} />
                                <span style={{ marginBottom: 'auto' }}>|</span>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Navbar