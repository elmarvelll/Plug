import { Link} from "react-router-dom";
// import { useState, useContext } from "react";
// import { VerifContext } from "../Approutes";


type button = {
    URL?: string;
    name: string
    clickFunction?: () => void | undefined
}
// function staticPage() {
//     // body.style.position = 'fixed'
// }

function ButtonLink({ URL = '/', name, clickFunction, }: button) {
    // const [Verified, setverified] = useState<boolean | null>(null)
    // const verif = useContext(VerifContext)
    // const isVerified = verif?.isVerified
    // const location = useLocation()
    return  (
        <div>
            <Link to={URL} className="linkcomp"><button style={{paddingRight:'10px'}}type="button"className="nav_link" onClick={clickFunction}>{name}</button></Link>
        </div>)
}
export default ButtonLink