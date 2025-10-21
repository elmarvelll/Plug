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
import { useRef } from 'react';


type slideProp = {
    name: string;
    array: any[]
}


function Slides(props: slideProp) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    return (
        <div className={slideStyles.slide_section}>
            <div className={slideStyles.slide_header}>
                {props.name}
            </div>
            <div className={slideStyles.slide_cards}>
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
                    // breakpoints={{
                    //     1: {
                    //         slidesPerView: 1,
                    //         spaceBetween: 10
                    //     },
                    //     575: {
                    //         slidesPerView: 2,
                    //         spaceBetween: 10
                    //     }
                    // }}
                    className={slideStyles.swiper}
                >
                    {/* <div className={slideStyles.cards}> */}
                        {props.array.map((business) => {
                            return (
                                <>
                                    <SwiperSlide key={business.id} style={{cursor:'pointer'}}>
                                        {/* <Card
                                            key={business.id}
                                            name={business.BusinessName}
                                            info={business.Category} 
                                            imgurl={business.secure_url}/> */}
                                    </SwiperSlide >
                                </>
                            )
                        })}
                    {/* </div > */}

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
export default Slides