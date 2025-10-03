
import { Response, Request } from "express";
import db from "../utils/db";

const Allproducts = async (req: Request, res: Response) => {
    const [products] = await db.query('SELECT * FROM products ')
    res.json(products)
}

export default Allproducts