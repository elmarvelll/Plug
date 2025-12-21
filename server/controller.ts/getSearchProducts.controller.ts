import { Request, Response } from "express"
import db from "../utils/db"

async function SearchProducts(req: Request, res: Response) {
    try {
        const { search } = req.query
        const [products] = await db.query('SELECT * FROM products WHERE LOWER(name) LIKE ? ', [`%${search}%`])
        res.json(products)
        console.log(products)
    } catch (error) {
        console.log('error getting search products ' + error)
    }

}

export default SearchProducts