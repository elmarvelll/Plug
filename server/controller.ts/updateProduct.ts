import { Response, Request } from "express";
import db from "../utils/db";

const updateProduct = async (req: Request, res: Response) => {
    const { business, productID } = req.params
    const { name, value, public_id } = req.body
    console.log(name, value, business, productID)
    try {
        await db.query(
            `UPDATE products SET ${name} = ? WHERE id = ?`,
            [value, productID]
        );
        console.log(`updated ${name} to ${value}`)
    } catch (error) {
        console.log('error uploading to the db')
        console.log(error)
    }

    if (public_id) {
        try {
            await db.query(
                `UPDATE businesses SET public_id = ? WHERE id = ?`,
                [public_id, productID]
            );
            console.log(`updated public_id to ${public_id}`)
        } catch (error) {
            console.log('error uploading to the db')
            console.log(error)
        }
    }
}
export default updateProduct