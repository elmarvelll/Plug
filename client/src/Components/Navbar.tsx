import Navlink from "./Navlinks"
import ButtonLink from "./ButtonLink"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import '../styles/Navbar.css'



function Navbar(props: { closeState: () => void ;}) {
    const [activePath,setactivePath] = useState<string>('/')
    const location = useLocation()
    const urlpath = location.pathname
    const linkroutes = [
    { class: 'nav_link', URL: '/', name: 'Buisness', toOtherRoute: false},
    { class: 'nav_link', URL: '/Services', name: 'Services', toOtherRoute: false},
    { class: 'nav_link', URL: '/My_buisness', name: "My Activity", toOtherRoute: true}

]

    return (
        <div className="navBar">
            <h1 className="LogoName">Plug</h1>
            <div className="nav_divs">
                <div className="nav_links">
                    <div className="links">
                        <div>
                            {linkroutes.map((link, index) => {
                                return <Navlink key={index} class={link.class} URL={link.URL} name={link.name} toOtherRoute={link.toOtherRoute} isActive = {link.URL === urlpath} setActive = {()=>setactivePath(link.URL)}  />
                            })}
                            
                        </div>
                    </div>

                    <div className="nav_buttons">
                        <ButtonLink class="nav_link white" URL="new buisness" name="Add a business" />
                    </div>
                </div>
            </div>
        </div>

    )

}
export default Navbar