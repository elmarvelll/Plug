import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import generatetoken from "../utils/generateTokens";
import { TokenPayload } from "../utils/auth";

const getRefrshToken = (req: Request, res: Response) => {
    const { refreshtoken } = req.cookies
    console.log('i am using the refresh cookies')
    console.log(req.cookies)
    type verify = {
        isVerified: boolean
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }

    if (refreshtoken) {
        console.log('refreshtoken present')
        const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET) as TokenPayload
        const user_id = decoded.userId
        try {
            const { accesstoken } = generatetoken(user_id, process.env.JWT_SECRET)
            res.cookie('accesstoken', accesstoken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 1
            })
            const isVerified: verify = { isVerified: true }
            res.json(isVerified)
        }
        catch (error) {
            console.log(error)
            const isVerified: verify = { isVerified: false }
            res.json(isVerified)
        }
    }
    else {
        console.log('refresh token not found')
        res.status(401).json({ message: 'refresh token not found' })
    }
}
export default getRefrshToken