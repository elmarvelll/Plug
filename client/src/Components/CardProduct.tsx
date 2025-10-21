import CardLink from "./CardLinks"
import cardStyle from '../styles/card.module.css'
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
import BusinessRegForm from "../Pages/BusinessregForm";
import { stateContext } from "../Pages/Home";
import { cartSettings } from "../utils/cartLayout";

type card = {
    name: string;
    info: string
    imgurl: string
    price?: string
    stock?: string
    businessName?: string
    businessId: string
    id: string
}



function CardProduct(props: card) {
    const navigate = useNavigate()
    const [hover, sethover] = useState<boolean>(false)
    const [hoverDetails, sethoverDetails] = useState<boolean>(false)


    // const [addState, setAddState] = useState<boolean>(false)
    // const body = document.body

    // useEffect(() => {
    //     if (addState) {
    //         console.log(addState)
    //     //     body.style.overflow = 'hidden'
    //     }
    //     // else {
    //     //     body.style.overflow = 'scroll'
    //     // }
    // }, [addState])
    const state = useContext(stateContext)
    const settings = cartSettings()
    if (!state || !settings) throw new Error('no state provided')
    const { add_to_cart } = settings
    const { setAddState, setscrollHeight, setComponent, setproduct, setBusinessId } = state

    function showProduct(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setAddState(true)
        setscrollHeight(window.scrollY)
        setComponent('product')
        setproduct(props.id)
        setBusinessId(props.businessId)
    }

    function hoverstate() {
        sethover(true)
    }

    return (
        <>
            <div className={cardStyle.card_div} style={{ cursor: 'pointer' }}
                onMouseEnter={() => sethover(true)}
                onMouseLeave={() => { sethover(false) }}
            >
                <div className={cardStyle.card_pic}>
                    <img src={props.imgurl} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 10px 0px 0px' }} alt="" loading="lazy" />
                    {hover &&
                        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgb(0,0,0,0.5)', top: 0, left: 0, borderRadius: '10px 10px 0px 0px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ backgroundColor: hoverDetails ? 'white' : 'lightgray', color:  'black', borderRadius: '10px', padding: '10px', fontFamily: '"Comfortaa", sans-serif', fontSize: 'small', transition: '300ms ease-out' }}
                                onMouseEnter={() => sethoverDetails(true)}
                                onMouseLeave={() => sethoverDetails(false)}
                                onClick={showProduct}
                            >
                                View Details
                            </div>
                        </div>
                    }
                </div>
                <div className={cardStyle.card_header}>
                    <h3 style={{ color: 'white', padding: '0px 20px' }}>{props.name}</h3>
                </div>
                <div className={cardStyle.card_category}>
                    {props.info}
                </div>
                {props.price &&
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: '400', margin: '0px', color: 'white', fontSize: 'large', padding: '0px 20px' }}>
                            ₦ {props.price}
                        </h3>
                        <button style={{ backgroundColor: '#FF7A00', borderRadius: '10px', fontSize: 'small', padding: '10px', color: 'white', margin: '0px 10px', boxSizing: 'border-box', transition: '300ms ease-out', opacity: hover ? 1 : 0 }} onClick={() => add_to_cart(props.id)}>Add to cart</button>
                    </div>
                }
                {/* {props.stock &&
                <div>
                    <h3 style={{ fontFamily: '"Comfortaa", sans-serif', fontWeight: '400', color: 'gray', fontSize: 'small', margin: '10px 0px' }}>
                        {props.stock} available
                    </h3>
                </div>
            } */}
                {props.businessName && <CardLink name={props.name} />}
            </div>
        </>
    )
}
export default CardProduct