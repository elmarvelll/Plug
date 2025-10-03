
import { Response, Request } from "express";
import db from "../utils/db";

const Allbusinesses = async (req: Request, res: Response) => {
    const [business] = await db.query('SELECT * FROM businesses ')
    res.json(business)
}

export default Allbusinesses