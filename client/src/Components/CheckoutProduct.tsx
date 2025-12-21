import axios from "axios"
import { useEffect, useState } from "react"
import { cartSettings, type cartType } from "../utils/cartLayout"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"
import type { Business } from "../utils/types/business.type"
import getDeliverydate from "../utils/getDeliverydate"
function CheckoutProduct(props: { name: string; description: string; quantity: number; cart_id: string; price: number; businessId: string; image: string; product_id: string; stock: number;deliverydate:string }) {
    const [venture, setventure] = useState<Business[]>([])
    const [number, setnumber] = useState<number>(props.quantity)
    const [hover, setHover] = useState<boolean>(false)
    const settings = cartSettings()
    if (!settings) throw new Error('no cart_state provided')
    const { setcart, cart } = settings
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
        axios.get('http://localhost:3000/cart/products', {
            Link: '/', params: {
                productID: props.product_id
            }
        } as Axios_Req_With_Url)
            .then((res) => {
                setnumber(res.data.products[0].quantity)
            })
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/business/${props.businessId}`)
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

        setcart(prevArr => {
            return (
                prevArr.map((item) => {
                    if (item.product_id === props.product_id) {
                        return { ...item, quantity: number }
                    } else {
                        return item
                    }
                })
            )
        })

        const timeout = setTimeout(() => {
            axios.put(`http://localhost:3000/cart/products`,
                {
                    quantity: number,
                    product_id: props.product_id,
                    cart_id: props.cart_id,
                })
            cartSettings
        }, 1000);
        return () => clearTimeout(timeout);
    }, [number])


    function add() {
        if (number < props.stock) {
            setnumber(num => num + 1)
        }
    }
    function subtract() {
        if (number > 1) {
            setnumber(num => num - 1)
        }
    }
    return (
        <div>
            <div style={{ border: hover ? '1px solid #FF7A00' : '1px solid #343434', marginBottom: '20px', borderRadius: '10px', width: '100%', padding: '10px', display: 'flex', boxSizing: 'border-box', transition: 'ease-out 300ms' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                <div style={{ backgroundColor: 'red', borderRadius: '20px', width: '100px', height: '100px' }}>
                    <img src={props.image} alt="" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }} />
                </div>
                <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <h3 style={{ color: 'white' }}>{props.name}</h3>
                    <p style={{ color: 'gray' }}>by {businesses.BusinessName}</p>
                    <h3 style={{ color: '#FF7A00' }}>₦ {props.price}</h3>
                    <p style={{ color: '#CC8500',fontSize:'x-small' }}>Expected delivery date: {props.deliverydate}</p>

                </div>
                <div style={{ margin: 'auto 20px auto auto' }}>
                    <button style={{ backgroundColor: '#FF7A00', color: 'white', borderRadius: '5px' }} onClick={subtract}>-</button>
                    <span style={{ color: 'white', margin: '0px 10px' }}>{number}</span>
                    <button style={{ backgroundColor: '#FF7A00', color: 'white', borderRadius: '5px' }} onClick={add}>+</button>
                </div>
            </div>
        </div>
    )
}
export default CheckoutProduct