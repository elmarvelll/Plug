import slide_styles from '../styles/slides.module.css'
import { useContext, useEffect, useState } from "react";
import { cartSettings } from "../utils/cartProvider";
import { stateContext } from "../Pages/Home";

type pricecard = {

    index: number
    name: string;
    info: string
    imgurl: string
    price: number
    stock?: number
    BusinessName: string
    businessId: string
    id: string
}




function IntroSlides(props: pricecard) {
    const [hover, sethover] = useState<string>('')
    const state = useContext(stateContext)
    const settings = cartSettings()
    if (!state || !settings) throw new Error('no state provided')
    const { add_to_cart } = settings
    const { setAddState, sethomescrollHeight, setComponent, setproduct, setBusinessId, setcategorystate } = state
    function showProduct(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log('added')
        setAddState(true)
        sethomescrollHeight(window.scrollY)
        setComponent('product')
        setproduct(props.id)
        setBusinessId(props.businessId)
    }

    return (
        <>
            <div className={slide_styles.card_div}>
                <div style={{ backgroundColor: '#0F1115', width: '100%', display: 'flex', justifyContent: 'right' }}>
                    <div style={{ position: 'relative', overflow: 'hidden', }}>
                        <img className={slide_styles.image} src={props.imgurl} alt="" loading="lazy" />
                    </div>
                    <section className='second_entry' style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', padding: '0px 100px', display: 'flex', alignItems: 'center', opacity: 0 }}>
                        <div>
                            <p style={{ color: '#F5F7FA' }}> # {props.index + 1} Trending</p>
                            <div style={{ marginBottom: '20px' }}>
                                <h1 style={{ color: '#F5F7FA', fontSize: '50px', fontWeight: 'lighter' }}>{props.name}</h1>
                            </div>
                            <div style={{ marginTop: '100px' }}>
                                <button style={{ backgroundColor: hover === 'add' ? '#3B74E6' : '#4F8CFF', borderRadius: '30px', fontSize: 'large', padding: '15px', color: 'white', margin: '0px 10px', boxSizing: 'border-box', fontWeight: 'bold', transition: '300ms ease-out' }}
                                    onMouseEnter={() => sethover('add')}
                                    onMouseLeave={() => { sethover('') }}
                                    onClick={() => { add_to_cart(props.id, props.price); setcategorystate && setcategorystate(false) }}
                                >Add to cart
                                </button>
                                <button style={{ backgroundColor: hover === 'details' ? '#3B74E6' : '#4F8CFF', borderRadius: '30px', fontSize: 'large', padding: '15px', color: 'white', margin: '0px 10px', boxSizing: 'border-box', fontWeight: 'bold', transition: '300ms ease-out' }}
                                    onMouseEnter={() => sethover('details')}
                                    onMouseLeave={() => { sethover('') }}
                                    onClick={showProduct}
                                >Details
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
export default IntroSlides