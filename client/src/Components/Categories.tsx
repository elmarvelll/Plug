import categoryStyles from '../styles/categories.module.css'
import foodImg from '../assets/categoryicons/foodImg4k.png'
import electronicsImg from '../assets/categoryicons/ElectronicsImg4k.png'
import cosmeticsImg from '../assets/categoryicons/Responsive_Homepage_Design_–_Figma_Make_Google_Chrome_09_10_2025 (3).png'
import clothingImg from '../assets/categoryicons/clothingimg4k.png'
import { useContext, useEffect, useRef } from 'react'
import { stateContext } from '../Pages/Home'


function Categories() {
    const categoryDiv = useRef<HTMLDivElement>(null)
    const state = useContext(stateContext)
    if (!state) throw new Error('no state provided')
    const { setcategory, setcategorystate, sethomescrollHeight } = state
    const refs = useRef<HTMLDivElement[]>([]);
    refs.current = [];
    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !refs.current.includes(el)) refs.current.push(el);
    };
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observe) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio >= 0.4) {
                    setTimeout(() => {
                        entry.target.classList.add('slide_in')
                        observer.unobserve(entry.target)
                    }, 200)
                }
            })
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        })

        refs.current.forEach(ref => observer.observe(ref));
        return () => {
            refs.current.forEach(ref => observer.unobserve(ref));
        }
    }, [])
    function category_select(category: string) {
        sethomescrollHeight(window.scrollY)
        setcategorystate(true)
        setcategory(category)
    }
    return (
        <section className={categoryStyles.category_section}>
            <div ref={addToRefs} className={categoryStyles.header}>
                <h1 style={{ color: '#F5F7FA', width: '100%', fontSize: 'xx-large', padding: '10px 0px' }}>
                    Browse By category
                </h1>
                <h3 style={{ color: '#A6ACB8' }}>
                    Explore what is available on campus
                </h3>
            </div>
            <div ref={addToRefs} className={categoryStyles.categories}>
                <div>
                    <div className={categoryStyles.category} onClick={() => category_select('Food')}>
                        <img src={foodImg} alt="food-img" style={{ objectFit: 'contain' }} />
                        <p className={categoryStyles.category_text}>Food</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category} onClick={() => category_select('Fashion')}>
                        <img src={clothingImg} alt="clothing-img" />
                        <p className={categoryStyles.category_text}>Fashion</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category} onClick={() => category_select('Cosmetics')}>
                        <img src={cosmeticsImg} alt="cosmetics-img" />
                        <p className={categoryStyles.category_text}>Cosmetics</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category} onClick={() => category_select('ELectronics')}>
                        <img src={electronicsImg} alt="electronics-img" />
                        <p className={categoryStyles.category_text}>Electronics</p>

                    </div>
                </div>

            </div>

        </section>
    )
}

export default Categories