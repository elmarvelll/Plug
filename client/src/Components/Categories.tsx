import categoryStyles from '../styles/categories.module.css'
import foodImg from '../assets/categoryicons/foodImg4k.png'
import electronicsImg from '../assets/categoryicons/ElectronicsImg4k.png'
import cosmeticsImg from '../assets/categoryicons/Responsive_Homepage_Design_–_Figma_Make_Google_Chrome_09_10_2025 (3).png'
import clothingImg from '../assets/categoryicons/clothingimg4k.png'
import { useEffect, useRef } from 'react'


function Categories() {
    const categoryDiv = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observe) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide_in')
                    observer.unobserve(entry.target)
                }
            })
        }, {
            root: null,
            rootMargin: '0px',
            // specifies how much margin around the root element
            threshold: 0.1
            // specifies how much of the element needs to be visible before the callback is executed
        })
        categoryDiv.current && observer.observe(categoryDiv.current)
    }, [])

    return (
        <section className={categoryStyles.category_section} ref={categoryDiv}>
            <h2 style={{ color: 'white', width: '100%', textAlign: 'center', fontSize: 'xx-large', padding: '10px 0px' }}>
                Browse By Category
            </h2>
            <div className={categoryStyles.categories}>

                <div>
                    <div className={categoryStyles.category}>
                        <img src={foodImg} alt="food-img" style={{ objectFit: 'contain' }} />
                        <p className={categoryStyles.category_text}>Food and drinks</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={clothingImg} alt="clothing-img" />
                        <p className={categoryStyles.category_text}>Clothing</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={cosmeticsImg} alt="cosmetics-img" />
                        <p className={categoryStyles.category_text}>Cosmetics</p>
                    </div>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={electronicsImg} alt="electronics-img" />
                        <p className={categoryStyles.category_text}>Electronics</p>

                    </div>
                </div>

            </div>

        </section>
    )
}

export default Categories