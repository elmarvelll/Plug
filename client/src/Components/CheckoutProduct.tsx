import axios from "axios"
import { useEffect, useState } from "react"
import type { cartType } from "../utils/cartLayout"
import type { Axios_Req_With_Url } from "../utils/config/axios_config"
import type { Business } from "../utils/types/business.type"

9
function CheckoutProduct(props: { name: string; description: string; price: number; businessId: string; image: string }) {
    const [venture, setventure] = useState<Business[]>([])
    const [hover, setHover] = useState<boolean>(false)
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
                </div>
            </div>
        </div>
    )
}
export default CheckoutProduct