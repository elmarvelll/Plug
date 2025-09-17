import { Request,Response } from "express"
import jwt from "jsonwebtoken";


const verifcheck = (req:Request, res:Response) => {
    type verify = {
        isVerified: boolean
    }
    const { accesstoken } = req.cookies
    console.log(req.cookies)
    if (!accesstoken) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
    try {
        const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET)
        const isVerified: verify = { isVerified: true }
        res.json(isVerified)
    } catch (error) {
        console.log('the error is ' + error)
        const isVerified: verify = { isVerified: false }
        res.json(isVerified)
    }
}

export default verifcheck