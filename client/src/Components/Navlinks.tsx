import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { VerifContext } from "../Approutes";
import GetBusinesses from "./getBusinesses";

type navlinks = {
   URL: string;
   name: string;
   toOtherUrl: boolean
   class: string;
   isActive: boolean,
   setActive: () => void
}


function Navlinks(props: navlinks) {
   const navlinkDiv = useRef<HTMLDivElement>(null)
   const [Hover, setIsHover] = useState(false);
   const [VBH, setVBH] = useState(false);
   const verif = useContext(VerifContext)
   const isVerified = verif?.isVerified

   return (
      !props.toOtherUrl ?
         <div>
            <div
               ref={navlinkDiv}
               className={props.isActive ? `${props.class} active` : props.class}
               onClick={() => setIsHover(val => !val)}
               style={{ cursor: 'pointer' }}
            >
               {props.name}
            </div>

            {Hover && props.name === 'My business' &&
               <div className="dropdown"
                  onMouseLeave={() => setIsHover(false)}
               >
                  {VBH &&
                     <div
                        className="vbh_div"
                        onMouseEnter={() => { setVBH(true); }}
                        onMouseLeave={() => setVBH(false)}>
                        <GetBusinesses sethover={() => setIsHover(false)} />
                     </div>
                  }
                  <div className="navlink_dropdown"
                     onMouseEnter={() => setIsHover(true)}
                  >
                     <div
                        onClick={() => setVBH(true)}
                        style={{ cursor: 'pointer' }}

                     >
                        View My Businesses
                     </div>
                     <Link to={props.URL}>
                        <div
                           onMouseEnter={() => setVBH(false)}
                           style={{ cursor: 'pointer' }}

                        >
                           Add a business
                        </div>
                     </Link>
                  </div>
               </div>
            }
         </div>
         :
         <Link to={props.URL}>
            <div
               ref={navlinkDiv}
               onClick={props.setActive}
               className={props.isActive ? `${props.class} active` : props.class}
               onMouseEnter={() => setIsHover(true)}
               onMouseLeave={() => setIsHover(false)}
            >
               {props.name}
            </div>
         </Link>

   )
}

export default Navlinks