import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
// import { useLocation } from "react-router-dom";
import GetBusinesses from "./getBusinesses";
// import { VerifContext } from "../Approutes";
import { cartSettings } from "../utils/cartProvider";
// import axios from "axios";
// import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import ShowCartProducts from "./showCartProducts";
import { hover } from "framer-motion";
// import cartImg from '../assets/photo_6019426893780076831_y.jpg'
type navlinks = {
   URL: string;
   name: string;
   toOtherUrl: boolean
   class: string;
   isActive: boolean,
   setActive: () => void
   total: number
   isNoti: boolean
}



function Navlinks(props: navlinks) {
   const navlinkDiv = useRef<HTMLDivElement>(null)
   const HoverDiv = useRef<HTMLDivElement>(null)
   const [Hover, setIsHover] = useState<boolean | null>(false);
   const settings = cartSettings()
   if (!settings) throw new Error('no cart_state provided')
   const { cart, setscrollHeight, setviewcart, notifications } = settings



   function CartclickState() {
      setscrollHeight(window.scrollY)
      setviewcart(true)
   }

   useEffect(() => {
      function handleClick(event: MouseEvent) {
         if (HoverDiv.current && !HoverDiv.current.contains(event.target as Node)) {
            setIsHover(false)
         }
      }
      document.addEventListener('mousedown', handleClick,true)
   }, [])


   return (
      !props.toOtherUrl ?
         <div style={{ position: 'relative' }}>
            {props.name === 'My business' &&
               <>
                  <div
                     className={props.isActive ? `${props.class} active` : props.class}
                     onClick={() => setIsHover(val => !val)}
                     style={{ cursor: 'pointer' }}
                  >
                     {props.name}
                  </div>
                  {props.isNoti &&
                     <div onClick={() => setIsHover(true)} style={{ backgroundColor: '#3B74E6', borderRadius: '100%', width: '10px', height: '10px', position: 'absolute', bottom: 5, left: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                     </div>}
                  <div className="dropdown"
                  >
                     <div className={Hover ? "navlink_dropdown enter" : "navlink_dropdown leave"}
                        ref={HoverDiv}
                     >
                        <Link to={props.URL}>
                           <div style={{ cursor: 'pointer' }}>
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
                     <div onClick={() => setIsHover(true)} style={{ backgroundColor: '#3B74E6', borderRadius: '100%', width: '10px', height: '10px', position: 'absolute', bottom: 5, left: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                        <span style={{ fontSize: 'xx-small', fontWeight: 'bolder' }}>{cart.length}</span>
                     </div>}
                  <div className="dropdown"
                  >
                     <div className={Hover ? "navlink_dropdown enter" : "navlink_dropdown leave"}
                        ref={HoverDiv}
                     >
                        <div style={{ backgroundColor: '#181B22', cursor: 'pointer', color: '#F5F7FA' }}>
                           <h4>Shopping Cart</h4>
                           {cart.length > 0 ?
                              <>
                                 <div style={{ overflow: 'auto', maxHeight: '200px', borderBottom: '1px solid #2A2F3A' }}>
                                    {cart.map((product) => {
                                       return <ShowCartProducts key={product.id} product={product} />
                                    })}
                                 </div>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'white' }}>Total Cost :</span>
                                    <h2 style={{ color: '#F5F7FA', margin: '10px 0px' }}>₦  {props.total}</h2>
                                 </div>
                                 <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <button className="AddButton" style={{ fontSize: 'medium', width: '60%', boxSizing: 'border-box', marginBottom: '20px' }} onClick={CartclickState}>Check Out</button>
                                 </div>
                              </>
                              :
                              <div style={{ padding: '20px 0px', display: 'flex', justifyContent: "center" }}>
                                 <h3 style={{ color: '#A6ACB8' }}>Your shopping cart is empty</h3>
                              </div>
                           }
                        </div>
                     </div>
                  </div>
               </>
            }
         </div>
         :
         <Link to={props.URL}>
            <>
               <div
                  onClick={props.setActive}
                  className={props.isActive ? `${props.class} active` : props.class}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
               >
                  {props.name}
                  {notifications.length !== 0 &&
                     <div onClick={() => setIsHover(true)} style={{ backgroundColor: '#3B74E6', borderRadius: '100%', width: '10px', height: '10px', position: 'absolute', bottom: 5, left: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px' }}>
                        <span style={{ fontSize: 'xx-small', fontWeight: 'bolder' }}>{notifications.length}</span>
                     </div>}
               </div>

            </>
         </Link>

   )
}

export default Navlinks