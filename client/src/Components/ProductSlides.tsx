import slideStyles from '../styles/slides.module.css'
import Card from "./Card"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { NavigationOptions } from "swiper/types";
import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import CardProduct from './CardProduct';


export type slideProp = {
    name: string;
    array: any[]
    sub: string
}




function ProductSlides(props: slideProp) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const refs = useRef<HTMLDivElement[]>([]);
    refs.current = [];
    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !refs.current.includes(el)) refs.current.push(el);
    };
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observe) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('slide_in')
                        observer.unobserve(entry.target)
                    }, 300)
                }
            })
        }, {
            root: null,
            rootMargin: '0px',
            // specifies how much margin around the root element
            threshold: 0.3
            // specifies how much of the element needs to be visible before the callback is executed
        })
        refs.current.forEach(ref => observer.observe(ref));
        return () => {
            refs.current.forEach(ref => observer.unobserve(ref));
        }
    }, [])


    return (
        <div className={slideStyles.slide_section}>
            <div ref={addToRefs} className={slideStyles.slide_header_container}>
                <h1 className={slideStyles.slide_header}>
                    {props.name}
                </h1>
                <div>
                    <h3 className={slideStyles.slide_sub}>
                        {props.sub}
                    </h3>
                </div>
            </div>
            <div ref={addToRefs} className={slideStyles.slide_cards}>
                <Swiper
                    modules={[Navigation, Pagination, Mousewheel, FreeMode]} // activate modules
                    slidesPerView={3}
                    slidesPerGroup={1}   // number of slides to move per swipe
                    spaceBetween={100}
                    freeMode={true}
                    mousewheel={{ forceToAxis: true }}
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
                    breakpoints={{
                        1: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        800: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }

                        // 948: {
                        //     slidesPerView: 4,
                        //     spaceBetween: 30
                        // }
                        // 1164: {
                        //     slidesPerView: 5,
                        //     spaceBetween: 0

                        // }

                    }}
                    className={slideStyles.swiper}
                >
                    {props.array.map((business) => {
                        return (
                            <>
                                <SwiperSlide key={business.id}>
                                    <div>
                                        <CardProduct
                                            key={business.id}
                                            name={business.name}
                                            info={business.description}
                                            price={business.price}
                                            businessId={business.business_id}
                                            id={business.id}
                                            stock={business.stock}
                                            imgurl={business.secure_url} />
                                    </div>
                                </SwiperSlide >

                            </>
                        )
                    })}

                    <button ref={prevRef} className={slideStyles.prev_button}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    <button ref={nextRef} className={slideStyles.next_button}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </Swiper>

            </div>
        </div >
    );

}

export default ProductSlides