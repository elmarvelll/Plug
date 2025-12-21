import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
interface Business {
    Number: string;
    Email: string;
    BusinessName: string;
    Category: string;
    BusinessDescription: string;
    DeliveryTime: string;
    Hall: string;
    RoomNumber: string;
    owner_id: number;
}

function GetBusinesses(props: { sethover: () => void }) {
    const [businesses, setbusiness] = useState<Business[]>([])
    useEffect(() => {
        axios.get('http://localhost:3000/business/getBusiness', { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
            .then((res) => setbusiness(res.data))
    }, [])


    return (
        businesses.length === 0 ?
            <p>
                no businesses found
            </p>
            :
            <div>
                {businesses.map((business,index) => {
                    return (
                        <Link to={`/mybusinesses/${business.BusinessName}/?page=Dashboard`} key={index} >
                            <div
                                onClick={() => props.sethover()}
                                className="businesslink">
                                <p style={{padding:'10px',marginBottom:'5px',}}>{business.BusinessName}</p>
                            </div>
                        </Link>)
                })}
            </div>

    )
}
export default GetBusinesses