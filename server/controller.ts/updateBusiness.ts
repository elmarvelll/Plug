import { Response, Request } from "express";
import db from "../utils/db";

const updateBusiness = async (req: Request, res: Response) => {
    const businessName = req.params.business
    const { name, value, public_id } = req.body
    try {
        await db.query(
            `UPDATE businesses SET ${name} = ? WHERE BusinessName = ?`,
            [value, businessName]
        );
        console.log(`updated ${name} to ${value}`)
    } catch (error) {
        console.log('error uploading to the db')
        console.log(error)
    }

    if (public_id) {
        try {
            await db.query(
                `UPDATE businesses SET public_id = ? WHERE BusinessName = ?`,
                [public_id, businessName]
            );
            console.log(`updated public_id to ${public_id}`)
        } catch (error) {
            console.log('error uploading to the db')
            console.log(error)
        }
    }

}

export default updateBusiness