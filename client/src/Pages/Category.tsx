import { useContext, useEffect, useState } from 'react';
import styles from '../styles/category.module.css'
import Category_Product from '../Components/Category_Product';
import axios from 'axios';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { stateContext } from './Home';


function Category(props: { Category: string }) {
    const [products, setproducts] = useState([])
    const [backHover, setbackHover] = useState<boolean>(false)
    const [showstate, setshowstate] = useState<boolean>(false)
    const state = useContext(stateContext)
    if (!state) throw new Error('no state provided')
    const { setcategorystate } = state


    useEffect(() => {
        axios.get(`http://localhost:3000/products/Category`, {
            params: {
                category: props.Category
            }
        })
            .then(res => setproducts(res.data.products))
    }, [])
    useEffect(() => {
        setTimeout(() => {
            setshowstate(true)
        }, 500);
    }, [])
    return (
        <section className={styles.category_section}>
            <div className={styles.heading}>
                <h3 style={{ color: backHover ? '#4F8CFF' : 'white', margin: 'auto 0px' }} onMouseEnter={() => setbackHover(true)} onMouseLeave={() => setbackHover(false)} onClick={() => setcategorystate(false)}><FontAwesomeIcon icon={faArrowLeft} /> Back</h3>
                <h2 style={{ margin: 'auto' }}>{props.Category}</h2>
            </div>
            {
                showstate &&
                <div className={styles.category_products}>
                    <p style={{ color: 'darkgray', fontSize: 'medium', margin: '20px' }}>{products.length} products found</p>
                    <div style={{ width: '100%', height: '500px', overflow: 'scroll' }}>
                        <Category_Product
                            name='New Products'
                            array={products.length !== 0 ? products : undefined}
                        />
                    </div>
                </div>
            }

        </section>
    )
}
export default Category