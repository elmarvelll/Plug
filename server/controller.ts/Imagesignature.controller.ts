import { Request, Response } from "express"
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const getSignature = (req: Request, res: Response) => {
    if (process.env.API_SECRET) {
        const timestamp = Math.floor(new Date().getTime() / 1000)
        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp: timestamp,
                folder:'plug'
            },
            process.env.API_SECRET
        )
        res.json({ timestamp, signature })
    }

    console.log('gotten')
}

export default getSignature