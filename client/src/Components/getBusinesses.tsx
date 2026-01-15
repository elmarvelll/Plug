import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import type { Axios_Req_With_Url } from "../utils/config/axios_config";
interface Business {
    BusinessName: string;
    unread: number
}

function GetBusinesses(props: { sethover: () => void }) {
    const [businesses, setbusiness] = useState<Business[]>([])
    useEffect(() => {
        axios.get('http://localhost:3000/business/getBusiness', { withCredentials: true, Link: '/' } as Axios_Req_With_Url)
            .then((res) => setbusiness(res.data))
    }, [])


    return (
        businesses.length === 0 ?
            <h3 style={{ color: '#A6ACB8' }}>
                You have no business
            </h3>
            :
            <div>
                <h4 style={{ color: '#F5F7FA', margin: '0px', paddingBottom: '10px' }}>Businesses</h4>
                {businesses.map((business, index) => {
                    return (
                        <Link to={`/mybusinesses/${business.BusinessName}/?page=Dashboard`} key={index}  state={{ URL: `/mybusinesses/${business.BusinessName}/` }} >
                            <div
                                onClick={() => props.sethover()}
                                className="businesslink"
                                style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p style={{ padding: '10px', marginBottom: '5px' }}>{business.BusinessName}</p>
                                {business.unread > 0 && <p>{business.unread}</p>}
                            </div>
                        </Link>)
                })}
            </div>

    )
}
export default GetBusinesses