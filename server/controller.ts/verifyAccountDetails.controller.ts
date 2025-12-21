
import axios from "axios";
import { Response, Request } from "express";


const verify_account = async (req: Request, res: Response) => {             
    try {
        const response = await axios.get("https://api.paystack.co/bank", {
            params: { country: "nigeria" },
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch banks" });
    }
}
export default verify_account