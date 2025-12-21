import axios from "axios";
import { Response, Request } from "express";

const getBankDetails = async (req: Request, res: Response) => {
    const { account_number, bank_code } = req.query
    console.log(req.query)
    try {
        const response = await axios.get(
            `https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
                }
            }
        );
            console.log(response.data.data)  
        res.json(response.data.data);
    } catch (error) {
        console.log(error)
    }
}

export default getBankDetails