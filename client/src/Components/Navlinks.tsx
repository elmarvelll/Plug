import { Link } from "react-router-dom";
import { useRef, useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import { VerifContext } from "../Approutes";

type navlinks = {
   URL: string;
   name: string
   class: string;
   toOtherRoute: boolean,
   isActive: boolean,
   setActive: () => void
}



function Navlinks(props: navlinks) {
   const navlinkDiv = useRef<HTMLDivElement>(null)
   const [clicked, setclicked] = useState<boolean>(false)
   const verif = useContext(VerifContext)
   const location = useLocation()
   return !props.toOtherRoute ? (
      <Link to={props.URL}>
         <div ref={navlinkDiv} onClick={props.setActive} className={props.isActive ? `${props.class} active` : props.class}>
            {props.name}
         </div>
      </Link>
   )
      :
      verif?.isVerified ? (
         <Link to={props.URL}>
            <div ref={navlinkDiv} onClick={props.setActive} className={props.isActive ? `${props.class} active` : props.class}>
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

export default Navlinks