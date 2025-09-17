import { Link, useLocation } from "react-router-dom"
import { useContext } from "react"
import { VerifContext } from "../Approutes"

type menulink = {
    name: string
    class: string
    URL?: string
}

function MenuLinks(props: menulink) {
    const location = useLocation()
    const verif = useContext(VerifContext)
    const isVerified = verif?.isVerified
    return isVerified ? (
        <Link to={`/${props.name}`}>
            <div className={props.class}>
                {props.name}
            </div>
        </Link>
    ) : (
        <Link to={'/login'}>
            <div className={props.class}>
                {props.name}
            </div>
        </Link>
    )
}
export default MenuLinks