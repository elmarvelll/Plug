import { useEffect, useRef, useState } from 'react'
import styles from '../styles/mybusiness.module.css'
import ProductCard from './ProductCard'
import axios from 'axios';
import type { Axios_Req_With_Url } from '../utils/config/axios_config';
import type { Product } from '../utils/types/product.types';
import EditProduct from './EditProduct';
import uploadImg from '../utils/uploadImage';
let timeout: NodeJS.Timeout

function Products(props: { addProduct: boolean; changeaddProductState: () => void; businessName: string | undefined, total_products: number, total_sold: number , total_revenue: number}) {
    const [products, setproducts] = useState<Product[]>([])
    const [item, setitem] = useState<Product[]>([])
    const [query, setquery] = useState('')
    const [scroll, setscroll] = useState<number | undefined>(0)
    const mainPage = useRef<HTMLDivElement>(null)
    const [editProduct, seteditproduct] = useState(false)
    const [imgfile, setimgfile] = useState<File | null>(null)



    useEffect(() => {
        axios.get(`http://localhost:3000/business/mybusiness/${props.businessName}/products`, { Link: location.pathname } as Axios_Req_With_Url)
            .then(res => setproducts(res.data))
    }, [])

    useEffect(() => {
        if (mainPage.current) {
            if (props.addProduct || editProduct) {
                mainPage.current.style.overflow = 'hidden';
            } else {
                mainPage.current.style.overflow = '';
            }
            return () => {
                if (mainPage.current) {
                    mainPage.current.style.overflow = '';
                }
            }
        }
    }, [props.addProduct, editProduct]);

    useEffect(() => {
        if (!mainPage.current) return
        const handleScroll = () => {
            setscroll(mainPage.current?.scrollTop);
        };
        mainPage.current.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    useEffect(() => {
        console.log(query)
        axios.get(`http://localhost:3000/business/mybusiness/${props.businessName}/products`, {
            params: {
                search: query
            }
        })
            .then((res) => setproducts(res.data))
    }, [query])



    function debounce(event: React.ChangeEvent<HTMLInputElement>) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            setquery(event.target.value)
        }, 1000);
    }




    async function getProduct(id: string) {
        const response = await axios.get(`http://localhost:3000/business/mybusiness/${props.businessName}/${id}`, { Link: location.pathname } as Axios_Req_With_Url)
        const { product } = response.data
        setitem(product)
        seteditproduct(val => !val)
    }

    async function submitdata(id: string | undefined,) {
        const img = await uploadImg(imgfile)
        console.log(img)
        if (id) {
            axios.put(`http://localhost:3000/business/mybusiness/${props.businessName}/${id}`,
                {
                    name: 'secure_url',
                    value: img.secure_url,
                    public_id: img.public_id
                })
        } else {
            console.log('no id')
        }

    }

    return (
        <div ref={mainPage} className={styles.businessPage}>
            <div className={styles.title}>
                My Products
            </div>
            <div className={styles.businessPage_data} >
                <div className={styles.product_container}>
                    <div className={styles.businessPage_intro}>
                        <h2>
                            My Products
                        </h2>
                        <p>
                            Manage your product inventory and track sales performance
                        </p>
                    </div>
                    <button className={styles.addProfile_button} onClick={() => props.changeaddProductState()} >
                        <span style={{ fontSize: 'large' }}>+</span>  Add Product
                    </button>
                </div>
                <div className={styles.order_datasection}>
                    <div className={styles.order_datadiv}>
                        <h4>Total Products</h4>
                        <p>{props.total_products}</p>
                    </div>
                    <div className={styles.order_datadiv}>
                        <h4>Total Sold</h4>
                        <p>{props.total_sold}</p>
                    </div>
                    <div className={styles.order_datadiv}>
                        <h4>Total Revenue</h4>
                        <p>₦ {props.total_revenue}</p>
                    </div>
                </div>
                <div style={{ width: '40%', minWidth: '230px' }}>
                    <input
                        type="text"
                        name="" id=""
                        placeholder='Search products'
                        onChange={debounce}
                        className={styles.profile_input}
                    />
                </div>
                {
                    products.length === 0 ?
                        <h2 style={{ textAlign: 'center', margin: '40px 0px 0px', fontFamily: '"Comfortaa", sans-serif' }}>
                            No product available
                        </h2>
                        :
                        <div className={styles.product_card_div}>
                            {
                                products.map((product) => {
                                    return (
                                        <ProductCard
                                            key={product.id}
                                            name={product.name}
                                            bio={product.description}
                                            price={product.price}
                                            SoldStock={product.stock}
                                            status={product.status}
                                            img={product.secure_url}
                                            edit={getProduct}
                                            id={product.id}
                                        />
                                    )
                                })
                            }
                        </div>
                }
                {
                    editProduct && <EditProduct scroll={scroll} removePage={() => seteditproduct(false)} item={item[0]} submitdata={submitdata} businessName={props.businessName} />
                }
            </div>

        </div>
    )
}

export default Products