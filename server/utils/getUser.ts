import jwt from "jsonwebtoken";
import { TokenPayload } from "./auth";


export function get_id(accesstoken: string) {
    if (process.env.JWT_SECRET) {
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET) as TokenPayload
        return decoded.userId
    }
    else{
        console.log('secret not found')
    }
}
