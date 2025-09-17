import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { VerifContext } from "../Approutes";


type button = {
    URL?: string;
    name: string
    class: string | undefined
    clickFunction?: () => void | undefined
}
function staticPage() {
    // body.style.position = 'fixed'
}

function ButtonLink({ URL = '/', name, class: className, clickFunction, }: button) {
    const [Verified, setverified] = useState<boolean | null>(null)
    const verif = useContext(VerifContext)
    const isVerified = verif?.isVerified
    const location = useLocation()
    return  (
        <div className={className}>
            <Link to={URL}><button type="button" className="button" onClick={clickFunction}>{name}</button></Link>
        </div>)
}
export default ButtonLink