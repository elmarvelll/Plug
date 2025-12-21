import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
// import { useLocation } from "react-router-dom";
import GetBusinesses from "./getBusinesses";
// import { VerifContext } from "../Approutes";
import { cartSettings } from "../utils/cartLayout";
// import axios from "axios";
// import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import ShowCartProducts from "./showCartProducts";
// import cartImg from '../assets/photo_6019426893780076831_y.jpg'
import { stateContext } from "../Pages/Home";

type navlinks = {
   URL: string;
   name: string;
   toOtherUrl: boolean
   class: string;
   isActive: boolean,
   setActive: () => void
   total: number
}



function Navlinks(props: navlinks) {
   const navlinkDiv = useRef<HTMLDivElement>(null)
   const HoverDiv = useRef<HTMLDivElement>(null)
   const [Hover, setIsHover] = useState<boolean | null>(false);
   // const [VBH, setVBH] = useState(false);
   // const verif = useContext(VerifContext)
   // const isVerified = verif?.isVerified
   const settings = cartSettings()
   if (!settings) throw new Error('no cart_state provided')
   // const state = useContext(stateContext)
   // if (!state) throw new Error('no state provided')
   // const { setAddState, sethomescrollHeight, setComponent } = state
   const { cart, setscrollHeight, setviewcart } = settings



   function CartclickState() {
      setscrollHeight(window.scrollY)
      setviewcart(true)
   }
   function BusinessclickState() {
      // sethomescrollHeight(window.scrollY)
      // setAddState(true)
      // setComponent('regform')
   }
   useEffect(() => {
      function handleClick(event: MouseEvent) {
         if (HoverDiv.current && !HoverDiv.current.contains(event.target as Node)) {
            setIsHover(false)
         }
      }
      HoverDiv.current && document.addEventListener('mousedown', handleClick)
   }, [])


   return (
      !props.toOtherUrl ?
         <div style={{ position: 'relative' }}>
            {props.name === 'My business' &&
               <>
                  <div
                     ref={navlinkDiv}
                     className={props.isActive ? `${props.class} active` : props.class}
                     onClick={() => setIsHover(val => !val)}
                     style={{ cursor: 'pointer' }}
                  >
                     {props.name}
                  </div>
                  <div className="dropdown"
                  // onMouseLeave={() => setIsHover(false)}
                  >
                     {/* {VBH &&
                     <div
                        className="vbh_div"
                        onMouseEnter={() => { setVBH(true); }}
                        onMouseLeave={() => setVBH(false)}>
                        <GetBusinesses sethover={() => setIsHover(false)} />
                     </div>
                  } */}
                     <div className={Hover ? "navlink_dropdown enter" : "navlink_dropdown leave"}
                        ref={HoverDiv}
                     // onMouseEnter={() => setIsHover(true)}
                     >
                        {/* {Hover && <div
                        onClick={() => setVBH(true)}
                        style={{ cursor: 'pointer', color: 'white' }}
                     >
                        <GetBusinesses sethover={() => setIsHover(false)} />
                     </div>} */}
                        <Link to={props.URL}>
                           <div
                              // onMouseEnter={() => setVBH(false)}
                              style={{ cursor: 'pointer', color: 'white' }}
                           >
                              {Hover && <GetBusinesses sethover={() => setIsHover(false)} />}
                           </div>
                        </Link>
                     </div>
                  </div>
               </>

            }
            {props.name === 'Cart' &&
               <>
                  <div
                     ref={navlinkDiv}
                     className={props.isActive ? `${props.class} active` : props.class}
                     onClick={() => setIsHover(val => !val)}
                     style={{ cursor: 'pointer' }}
                  >
                     {props.name}
                  </div>
                  {cart.length !== 0 &&
                     <div onClick={() => setIsHover(true)} style={{ backgroundColor: '#FF7A00', borderRadius: '100%', width: '10px', height: '10px', position: 'absolute', bottom: 5, left: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                        <span style={{ fontSize: 'xx-small', fontWeight: 'bolder' }}>{cart.length}</span>
                     </div>}
                  <div className="dropdown"
                  >
                     <div className={Hover ? "navlink_dropdown enter" : "navlink_dropdown leave"}
                        ref={HoverDiv}
                     >
                        {/* <Link to={props.URL}> */}
                        <div style={{ cursor: 'pointer', color: 'white' }}>
                           <div style={{ overflow: 'auto', maxHeight: '200px' }}>
                              {cart.map((product) => {
                                 return <ShowCartProducts key={product.id} product={product} />
                              })}
                           </div>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'white' }}>Total Cost :</span>
                              <h2 style={{ color: '#FF7A00', margin: '10px 0px' }}>₦  {props.total}</h2>
                           </div>
                           <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                              <button className="AddButton" style={{ fontSize: 'medium', width: '60%', boxSizing: 'border-box', marginBottom: '20px' }} onClick={CartclickState}>Check Out</button>
                           </div>
                        </div>
                        {/* </Link> */}
                     </div>
                  </div>
               </>
            }
            {
               props.name === 'Add Business' &&
               <>
                  <div
                     ref={navlinkDiv}
                     className={props.class}
                     onClick={BusinessclickState}
                     style={{ cursor: 'pointer' }}
                  >
                     {props.name}
                  </div>
               </>
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