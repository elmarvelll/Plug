import { useContext, useEffect, useState } from "react";
import Slides from "./Slides"
import axios from "axios";
import type { Product } from "../utils/types/product.types";
import BusinessSlide from "./BusinessSlides";
import ProductSlides from "./ProductSlides";
import { VerifContext } from "../Approutes";

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
function HomePageSlides() {
    const [businesses, setbusinessses] = useState<businessCredentials[]>([])
    const [products, setproducts] = useState<Product[]>([])
    const [searchproducts,setsearchproducts] = useState<Product[]>([])
    const verif = useContext(VerifContext)
    if (!verif) throw new Error('no verif_state provided')
    const { searchtext } = verif

    useEffect(() => {
        if (searchtext !== null) {
            axios.get('http://localhost:3000/products/searchRequest',
                { params: { search: searchtext.toLowerCase() } })
                .then((res)=>setsearchproducts(res.data))
        }
    }, [searchtext])



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
        <section style={{ backgroundColor: '#121212', padding: '20px 0px' }}>
            {searchtext !== null &&
                <ProductSlides
                    name={searchproducts.length !== 0 ? `Results for "${searchtext}"`:`No results for "${searchtext}"`}
                    array={searchproducts}
                />
            }

            <ProductSlides
                name='New Products'
                array={products}
            />
            <ProductSlides
                name='Trending Products'
                array={products}
            />
            <BusinessSlide
                name='Top Businesses'
                array={businesses}
            />

            {/* version 2 loading */}
            {/* <Slides
                name='SERVICES'
                array={fake_businesses}
            /> */}
        </section>
    )
}

export default HomePageSlides