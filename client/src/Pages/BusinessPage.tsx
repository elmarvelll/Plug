import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import type { Business } from "../utils/types/business.type";
import UserProduct from "../Components/UserProduct";
import type { Product } from "../utils/types/product.types";
let timeout: NodeJS.Timeout





function BusinessPage() {
    const { businessID } = useParams<{ businessID: string }>()
    const navigate = useNavigate()
    const [query, setquery] = useState('')
    const [venture, setventure] = useState<Business[]>([])
    const [products, setproducts] = useState<Product[]>([])
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
        axios.get(`http://localhost:3000/business/${businessID}`, { withCredentials: true, Link: `/businesses/${businessID}` } as Axios_Req_With_Url)
            .then((res) => setventure(res.data.businesses))
    }, [])

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
            axios.get(`http://localhost:3000/business/${businessID}/products`, {
                params: {
                    search: query
                },
                Link: `/businesses/${businessID}`
            } as Axios_Req_With_Url)
                .then((res) => {
                    console.log(res.data.product)
                    setproducts(res.data.product)
                })
    }, [query])

    function debounce(event: React.ChangeEvent<HTMLInputElement>) {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            setquery(event.target.value)
        }, 1000);
    }



    return (
        <div style={{ padding: '20px 40px' }}>
            <div style={{ display: 'flex' }}>
                <span style={{ borderRadius: '100%' }}>
                    <img src={businesses.secure_url === '' ? undefined : businesses.secure_url} alt="" style={{ objectFit: 'fill', width: '80px', height: '80px', borderRadius: '100%' }} />
                </span>
                <span style={{ paddingLeft: '20px' }}>
                    <h2 style={{ margin: '10px 0px', cursor: 'pointer' }} onClick={() => setquery('')}>
                        {businesses.BusinessName}

                    </h2>
                    <p>
                        {businesses.Category}
                    </p>
                </span>
            </div>
            <div>
                <p style={{ color: 'gray', fontSize: 'medium', margin: '10px 0px' }}>Email : {businesses.Email}</p>
                <p style={{ color: 'gray', fontSize: 'medium', margin: '10px,0px' }}>Delivery Time : {businesses.DeliveryTime}</p>
            </div>
            <hr style={{ margin: '30px 0px' }} />
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ margin: '20px 0px' }}>
                    About this business
                </h3>
                <p>
                    {businesses.BusinessDescription}
                </p>
            </div>
                <div style={{ width: '40%', minWidth: '230px' }}>
                    <input
                        type="text"
                        name="" id=""
                        placeholder='Search products'
                        onChange={debounce}
                        className='profile_input'
                    />
                </div>
            <div >
                <h3 style={{ marginBottom: '20px' }}>
                    Products
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {products.length > 0 ?
                        (products.map((product) => {
                            return (
                                <UserProduct
                                    key={product.id}
                                    Url={product.secure_url}
                                    name={product.name}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock}
                                />)
                        }))
                        :
                        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
                            <p>No products available</p>
                        </div>
                    }





                </div>
            </div>

        </div>
    )
}
export default BusinessPage