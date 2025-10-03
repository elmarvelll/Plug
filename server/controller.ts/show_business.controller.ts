
import { Response, Request } from "express";
import db from "../utils/db";

const showBusiness = async (req: Request, res: Response) => {
    const { business } = req.params
    const [businesses] = await db.query('SELECT * FROM businesses WHERE BusinessName = ?',[business])
    res.json({businesses})

    console.log(businesses)
}
export default showBusiness