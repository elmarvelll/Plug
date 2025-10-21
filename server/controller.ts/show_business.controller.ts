
import { Response, Request } from "express";
import db from "../utils/db";

const showBusiness = async (req: Request, res: Response) => {
    const { businessID } = req.params
    console.log(businessID)
    const [businesses] = await db.query('SELECT * FROM businesses WHERE id = ?',[businessID])
    res.json({businesses})
}
export default showBusiness