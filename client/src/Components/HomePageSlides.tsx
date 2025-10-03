import { useEffect, useState } from "react";
import Slides from "./Slides"
import axios from "axios";
import type { Product } from "../utils/types/product.types";
import BusinessSlide from "./BusinessSlides";
import ProductSlides from "./ProductSlides";

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

const fake_businesses = [
    { business_id: 1, business_name: "Marvelous Electronics", business_categories: "Electronics" },
    { business_id: 2, business_name: "Savvy Styles", business_categories: "Fashion" },
    { business_id: 3, business_name: "Fresh Bites", business_categories: "Food & Beverages" },
    { business_id: 4, business_name: "Tech Solutions", business_categories: "IT Services" },
    { business_id: 5, business_name: "Home Comforts", business_categories: "Home & Living" },
    { business_id: 6, business_name: "Fitness Hub", business_categories: "Health & Fitness" },
    { business_id: 7, business_name: "Book Nook", business_categories: "Books & Stationery" },
    { business_id: 8, business_name: "Beauty Bliss", business_categories: "Beauty & Personal Care" },
    { business_id: 9, business_name: "AutoMart", business_categories: "Automotive" },
    { business_id: 10, business_name: "Toyland", business_categories: "Kids & Toys" }
];

function HomePageSlides() {
    const [businesses, setbusinessses] = useState<businessCredentials[]>([])
    const [products, setproducts] = useState<Product[]>([])



    useEffect(() => {
        async function getBusiness() {
            try {
                const getRequest = await axios.get('http://localhost:3000/business/allBusiness')
                const business = getRequest.data
                if (business.length > 0) {
                    setbusinessses([...business])
                }
            } catch (error) {
                console.log('error fetching businesses')
                console.log(error)
            }
        }
        getBusiness()
    }, [])


    useEffect(() => {
        async function getProducts() {
            try {
                const getRequest = await axios.get('http://localhost:3000/business/allProducts')
                const products = getRequest.data
                if (products.length > 0) {
                    setproducts([...products])
                }
            } catch (error) {
                console.log('error fetching businesses')
                console.log(error)
            }
        }
        getProducts()
    }, [])
    

    return (
        <>
            <ProductSlides
                name='TRENDING PRODUCTS'
                array={products}
            />
            <ProductSlides
                name='NEW PRODUCTS'
                array={products}
            />
            <BusinessSlide
                name='BUSINESSES'
                array={businesses}
            />

            {/* version 2 loading */}
            {/* <Slides
                name='SERVICES'
                array={fake_businesses}
            /> */}
        </>
    )
}

export default HomePageSlides