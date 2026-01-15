import axios from "axios"
import { useContext, useEffect, useState } from "react"
import busregstyles from '../styles/businessregForm.module.css'
// import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import type { Business } from "../utils/types/business.type";
import UserProduct from "../Components/UserProduct";
import type { Product } from "../utils/types/product.types";
import { stateContext } from "./Home";
import { cartSettings } from "../utils/cartProvider";
import getDeliverydate from "../utils/getDeliverydate";
// let timeout: NodeJS.Timeout





function ProductPage(props: { businessId: string | null; product: string | null }) {
    const state = useContext(stateContext)
    const settings = cartSettings()
    if (!state || !settings) throw new Error('no state provided')
    const { add_to_cart } = settings
    const { setAddState } = state
    const [date, setdate] = useState<string | undefined>(undefined)
    // const { businessID, product } = useParams<{ businessID: string, product: string }>()
    // const navigate = useNavigate()
    // const [query, setquery] = useState('')
    const [venture, setventure] = useState<Business[]>([])
    const [products, setproducts] = useState<Product[]>([])
    const [product, setproduct] = useState<Product>({
        id: '',
        business_id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
        public_url: '',
        secure_url: '',
        status: 'active',
        created_at: '',
        updated_at: '',
    })
    const [businesses, setbusinesses] = useState<Business>({
        Email: '',
        Number: '',
        BusinessName: '',
        Category: '',
        BusinessDescription: '',
        DeliveryTime: '',
        Hall: '',
        RoomNumber: '',
        secure_url: ''
    })

    useEffect(() => {
        console.log(props.businessId,props.product)
        axios.get(`http://localhost:3000/business/${props.businessId}`, { withCredentials: true, Link: `/` } as Axios_Req_With_Url)
            .then((res) => setventure(res.data.businesses))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/business/${props.businessId}/product`, {
            params: {
                search: props.product
            },
            Link: `/`
        } as Axios_Req_With_Url)
            .then((res) => setproducts(res.data.product))
    }, [])
    useEffect(() => {
        setdate(getDeliverydate(businesses.DeliveryTime))
        // console.log(getDeliverydate(businesses.DeliveryTime))
    }, [businesses])

    useEffect(() => {
        if (venture.length > 0) {
            setbusinesses({
                Email: venture[0].Email,
                Number: venture[0].Number,
                BusinessName: venture[0].BusinessName,
                Category: venture[0].Category,
                BusinessDescription: venture[0].BusinessDescription,
                DeliveryTime: venture[0].DeliveryTime,
                Hall: venture[0].Hall,
                RoomNumber: venture[0].RoomNumber,
                secure_url: venture[0].secure_url
            })
        }
    }, [venture])

    useEffect(() => {
        if (products.length > 0) {
            setproduct({
                id: products[0].id,
                business_id: products[0].business_id,
                name: products[0].name,
                description: products[0].description,
                price: products[0].price,
                stock: products[0].stock,
                public_url: products[0].public_url,
                secure_url: products[0].secure_url,
                status: products[0].status,
                created_at: products[0].created_at,
                updated_at: products[0].updated_at,
            })
        }
    }, [products])

    async function Add() {
        add_to_cart(product.id, product.price)
        setAddState(false)
    }

    return (
        <section
            style={{ width: '75%', height: '80%', display: 'flex', margin: '40px 0px', flexDirection: 'column', boxSizing: 'border-box', backgroundColor: '#181B22',border:'1px solid #2A2F3A',  borderRadius: '10px', padding: '20px' }}
            className={busregstyles.busform_section}
        >
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <img src={product.secure_url === '' ? undefined : product.secure_url} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} />
                </div>
                <div style={{ width: '100%', height: '100%', padding: '50px', overflow: 'auto', boxSizing: 'border-box', position: 'relative' }}>
                    <h1 style={{ margin: '10px 0px', cursor: 'pointer', color: 'white' }}>
                        {product.name}
                    </h1>
                    <div style={{ paddingBottom: '20px' }} >
                        <span style={{ color: 'gray' }}>Sold By</span><span style={{ color: 'white', fontWeight: 'bolder', fontSize: 'x-large' }}> {businesses.BusinessName}</span>
                    </div>

                    <h1 style={{ color: '#4F8CFF', paddingBottom: '20px' }}>
                        ₦ {product.price}
                    </h1>
                    <div style={{ paddingBottom: '20px' }}>
                        <p style={{ color: '#A6ACB8' }}>{product.description}</p>
                    </div>
                    <div>
                        <p style={{ color: '#A6ACB8', fontSize: 'small' }}> will be delivered on {date}</p>
                    </div>
                    {/* <div style={{ width: '100%', marginTop: 'auto', position: 'absolute', bottom: 0, boxSizing: 'border-box' }}> */}
                    <button className="AddButton" style={{ fontSize: 'medium', width: '60%', boxSizing: 'border-box', marginBottom: '20px', position: 'absolute', bottom: 0 }} onClick={Add}>Add to cart</button>
                    {/* </div> */}
                </div>
            </div>
        </section >
    )

}
export default ProductPage