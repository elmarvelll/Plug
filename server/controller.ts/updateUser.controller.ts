import { Response, Request } from "express";
import db from "../utils/db";
import { hashPassword } from "../utils/hash";

const updateUser = async (req: Request, res: Response) => {
    const { userID, } = req.params
    const { name, value, public_id, password } = req.body
    console.log(req.query)
    if (password) {
        const encrypted_password = await hashPassword(password)
        try {
            await db.query(
                `UPDATE users SET password = ? WHERE user_id = ?`,
                [encrypted_password, userID]
            );
            console.log(`updated password`)
            res.status(201).json({success:'success'})
        } catch (error) {
            console.log('error uploading to the db')
            console.log(error)
        }
    }
    else if (public_id) {
        try {
            await db.query(
                `UPDATE users SET public_id = ?, secure_url = ? WHERE user_id = ? `,
                [public_id, value, userID]
            );
            console.log(`updated public_id to ${public_id}`)
        } catch (error) {
            console.log('error uploading to the db')
            console.log(error)
        }
    }
    else if (name) {
        try {
            await db.query(
                `UPDATE users SET ${name} = ? WHERE user_id = ?`,
                [value, userID]
            );
            console.log(`updated ${name} to ${value}`)
        } catch (error) {
            console.log('error uploading to the db')
            console.log(error)
        }
    }

}

export default updateUser