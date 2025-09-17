import { Response, Request } from "express";
import db from "../utils/db";
import { v4 as uuidv4 } from 'uuid';


const save_to_db = async (req: Request, res: Response) => {
    const { accesstoken } = req.cookies
    const owner_id = req.user?.userId
    const newId = uuidv4()
    const data = req.body
    console.log(data)
    try {
        await db.query('INSERT INTO businesses (id,business_name,owner_id) VALUES (?,?,?)',
            [newId, data.secondSection.BusinessName, owner_id,])
            .then(() => console.log('inserted business sucessfully to db'))

        await db.query('INSERT INTO  business_owners (business_id, Name, Matriculation_Number, university_level, email, number) VALUES (?,?,?,?,?,?)',
            [newId, data.firstSection.fullName, data.firstSection.MatNo, data.firstSection.Level, data.firstSection.Email, data.firstSection.Number])
            .then(() => console.log('inserted business Owner sucessfully to db'))

            await db.query('INSERT INTO businessinfo (business_id, business_categories, business_description, delivery_services, operating_days, Image_public_id, image_secure_url) VALUES (?,?,?,?,?,?,?)',
            [newId, data.secondSection.Category, data.secondSection.BuisnessDescription, data.thirdSection.delivery, JSON.stringify(data.thirdSection.operatingdays), data.businessImgDetails?data.businessImgDetails.public_id : null, data.businessImgDetails? data.businessImgDetails.secure_url: null])
            .then(() => console.log('inserted business info sucessfully to db'))
    }
    catch (error) {
        console.log('error uploading business to the db')
        console.log(error)

    }
}
export default save_to_db