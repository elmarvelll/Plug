import categoryStyles from '../styles/categories.module.css'
import foodImg from '../assets/categoryicons/food img.jpg'
import electronicsImg from '../assets/categoryicons/electronics img.jpg'
import cosmeticsImg from '../assets/categoryicons/cosmetics img.jpg'
import clothingImg from '../assets/categoryicons/clothing img.jpg'
import serviceImg from '../assets/categoryicons/serviceImg.jpg'


function Categories() {
    return (
        <>
            <div className={categoryStyles.categories}>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={foodImg} alt="food-img" />
                    </div>
                    <p className={categoryStyles.category_text}>Food and drinks</p>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={clothingImg} alt="clothing-img" />
                    </div>
                    <p className={categoryStyles.category_text}>Clothing</p>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={cosmeticsImg} alt="cosmetics-img" />
                    </div>
                    <p className={categoryStyles.category_text}>Cosmetics</p>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={electronicsImg} alt="electronics-img" />
                    </div>
                    <p className={categoryStyles.category_text}>Electronics</p>
                </div>
                <div>
                    <div className={categoryStyles.category}>
                        <img src={serviceImg} alt="service-img" />
                    </div>
                    <p className={categoryStyles.category_text}>Services</p>
                </div>

            </div>

        </>
    )
}

export default Categories