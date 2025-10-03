import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
import type { Business } from "../utils/types/business.type";




function BusinessPage() {
    const { business } = useParams<{ business: string }>()
    const [venture, setventure] = useState<Business[]>([])
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
        axios.get(`http://localhost:3000/business/${business}`, { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
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
            <div>
                <h2>
                    {businesses.BusinessName}

                </h2>
                <p>
                    {businesses.Category}
                </p>
            </div>
            <div>
                <p>Email : {businesses.Email}</p>
                <p>Delivery Time : {businesses.DeliveryTime}</p>
            </div>
            <div>
                <h3>About this business</h3>
                <p>
                    {businesses.BusinessDescription}
                </p>
            </div>

        </div>
    )
}
export default BusinessPage