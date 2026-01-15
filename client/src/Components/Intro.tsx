
import '../styles/Intro.css'
import slideStyles from '../styles/slides.module.css'
import React, { useContext, useEffect, useRef, useState } from 'react';
import BusinessProfile from './BusinessProfile';
import BusinessRegForm from '../Pages/BusinessregForm';
import { stateContext } from '../Pages/Home';
import axios from 'axios';
import type { Product } from '../utils/types/product.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import CardProduct from './CardProduct';
import IntroSlides from './IntroSlides';
import type { NavigationOptions } from 'swiper/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

StyleSheet
interface withName extends Product {
    BusinessName: string
}
function Intro() {

    const state = useContext(stateContext)
    const [products, setproducts] = useState<withName[]>([])
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    if (!state) throw new Error('no state provided')
    const { setAddState, sethomescrollHeight, setComponent } = state
    const [text, settext] = useState('')

    function checkclickState() {
        sethomescrollHeight(window.scrollY)
        setAddState(true)
        setComponent('regform')
    }
    function ChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        settext(value)
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const getRequest = await axios.get('http://localhost:3000/business/allProducts')
                const product = getRequest.data.products
                if (product.length > 0) {
                    setproducts([...product])
                }
            } catch (error) {
                console.log('error fetching businesses')
                console.log(error)
            }
        }
        getProducts()
    }, [])

    return (
        <div className="Intro_div first_entry">
            <Swiper
                // install Swiper modules
                // style={{ width: '90%' }}
                preventClicks={false}
                preventClicksPropagation={false}
                touchStartPreventDefault={false}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true, dynamicBullets: true, }}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                } as NavigationOptions}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation) {
                        (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
                        (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
                    }
                }}
            >
                {
                    products.map((business, index) => {
                        return (
                            <>
                                <SwiperSlide key={business.id}>
                                    <IntroSlides
                                        index={index}
                                        key={business.id}
                                        name={business.name}
                                        info={business.description}
                                        price={business.price}
                                        businessId={business.business_id}
                                        BusinessName={business.BusinessName}
                                        id={business.id}
                                        stock={business.stock}
                                        imgurl={business.secure_url} />
                                </SwiperSlide >
                            </>
                        )
                    })
                }

                < button ref={prevRef} className={slideStyles.prev_button}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <button ref={nextRef} className={slideStyles.next_button}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </Swiper>
            {/* <div className="intro_text">
                <div className="text_div">
                    <div className='first_entry'>
                        <h1 style={{ fontSize: '75px', color: '#F5F7FA' }}>Your Campus</h1>
                        <h1 style={{ fontSize: '75px', color: '#F5F7FA' }}>MarketPlace, </h1>
                        <h1 style={{ fontSize: '75px', paddingTop: '20px', color: '#A6ACB8' }}>Simplified.</h1>
                    </div>
                    <div className='hidden third_entry' style={{ width: '100%' }}>
                        <button className="AddButton" style={{ fontSize: 'medium' }} onClick={checkclickState}>Add your business</button>
                    </div>
                </div>
            </div> */}
        </div >
    )
}
export default Intro