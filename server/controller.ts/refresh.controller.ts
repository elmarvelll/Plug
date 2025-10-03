import { Request, Response } from "express"
import jwt from "jsonwebtoken";
import generatetoken from "../utils/generateTokens";
import { TokenPayload } from "../utils/auth";

const getRefrshToken = (req: Request, res: Response) => {
    const { refreshtoken } = req.cookies
    type verify = {
        isVerified: boolean
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
        try {
            const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET) as TokenPayload
            const user_id = decoded.userId
            try {
                const { accesstoken } = generatetoken(user_id, process.env.JWT_SECRET)
                res.cookie('accesstoken', accesstoken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'lax',
                    maxAge: 1000 * 60 * 10
                })
            } catch (error) {
                console.log('Error from refresh cookie controller 1: ' + error)
            }
            const isVerified: verify = { isVerified: true }
            res.json(isVerified)
            console.log('Success from refresh Cookie controller')
        }
        catch (error) {
            console.log('Error from refresh cookie controller 2: ' + error)
            const isVerified: verify = { isVerified: false }
            res.status(401).json({ message: 'refresh token not found' ,isVerified})
        }
    }
export default getRefrshToken