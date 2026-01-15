
import { Response, Request } from "express";
import { Product } from "../routes/Business.route";
import db from "../utils/db";
import { getCarouselImage } from "../utils/getCarouselmg";

const Allproducts = async (req: Request, res: Response) => {
    const [row] = await db.query('SELECT products.id,products.description,products.name,products.price,products.business_id,products.stock,products.secure_url,products.public_url,b.BusinessName from plug.products JOIN plug.businesses b ON business_id = b.id')
    const productsArray = row as Product[]
    const products = productsArray.map((product) => {
        return {
            ...product,
            // secure_url: product.secure_url
            secure_url: getCarouselImage(product.public_url)
        }
    })
    const [trendingproducts] = await db.query('SELECT products.id,products.description,products.name,products.price,products.business_id,products.stock,products.secure_url,COUNT(*) AS total from plug.orders JOIN plug.order_items ON orders.id = order_items.order_id JOIN plug.products ON product_id = products.id JOIN plug.businesses ON business_id = businesses.id GROUP BY product_id ORDER BY total DESC')
    res.json({ products, trendingproducts })
}

export default Allproducts