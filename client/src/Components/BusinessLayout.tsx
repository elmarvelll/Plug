import Card from "./Card"
import MenuLinks from "./menuLinks"
import '../styles/BuisnessPage.css'
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"


type businessCredentials = {
    id: string;
    business_name: string;
    owner_id: string;
    created_at: string;
    business_id: string;
    business_categories: string;
    business_description: string;
    delivery_services: string;
    operating_days: string;
    image_public_id: string | null;
    image_secure_url: string | null;
}

const number: number = 0

function BusinessesLayout() {
    const [businesses, setbusinessses] = useState<businessCredentials[]>([])

    useEffect(() => {
        async function getBusiness() {
            try {
                const getRequest = await axios.get('http://localhost:3000/get_businesses')
                const business = await getRequest.data.businesses
                setbusinessses([...business])
            } catch (error) {
                console.log('error fetching businesses')
                console.log(error)
            }
        }
        getBusiness()
    }, [])



    return (
        <div className="Buisness_Layout">
            <div className="business_header">
                <span>Buisnesses Available </span>
                <p>{number} Buisnesses Online</p>
            </div>
            <div className="buisness_actions">
                <div className="cards">
                    {businesses.map((business) => {
                        return (
                            <Card 
                            key = {business.business_id} 
                            name={business.business_name}
                            info = {business.business_description} />
                        )
                    })}
                </div>
                <div className="buisness_links">
                    <MenuLinks name=" Chats" class="menulink" />
                    <MenuLinks name=" History" class="menulink" />
                    <MenuLinks name=" My Business" class="menulink" />
                    <MenuLinks name=" Notifications" class="menulink" />
                    <MenuLinks name=" Log Out" class="menulink" />
                </div>
            </div>
        </div>
    )
}

export default BusinessesLayout