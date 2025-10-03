import { Request,Response } from "express"
import jwt from "jsonwebtoken";


const verifcheck = (req:Request, res:Response) => {
    type verify = {
        isVerified: boolean
    }
    const { refreshtoken } = req.cookies
    //  I AM USING REFRESH BECAUSE THE REFRESH WOULD STILL GET THE ACCESS FROM THE BACKEND AND THIS IS FOR THE FRONTEND SO..............
    if (!refreshtoken) {
        return res.json({ error: 'Access token not found' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }
    try {
        const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET)
        const isVerified: verify = { isVerified: true }
        res.json(isVerified)
    } catch (error) {
        console.log('the error from verify controller')
        const isVerified: verify = { isVerified: false }
        res.json({error: 'error from verify controller'})
    }
}

export default verifcheck