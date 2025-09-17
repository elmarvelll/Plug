import { Request, Response } from "express"
import { comparePassword } from "../utils/hash"
import generatetoken from "../utils/generateTokens"
import db from "../utils/db"
type credential = {
    user_id: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string
}
const verifyUser = async (req: Request, res: Response) => {
    const credentials = req.body.credentials
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [credentials.email])
    const users = rows as credential[]
    console.log(users)
    if (users.length != 0) {
        const passwordCheck = await comparePassword(credentials.password, users[0].password)
        if (passwordCheck) {
            console.log('password is correct')
            if (process.env.JWT_SECRET) {
                const { accesstoken, refreshtoken } = generatetoken(users[0].user_id, process.env.JWT_SECRET)
                try {
                    res.cookie('refreshtoken', refreshtoken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax',
                        maxAge: 1000 * 60 * 30
                    })
                    res.cookie('accesstoken', accesstoken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax',
                        maxAge: 1000 * 60 * 1
                    }).json({ approved: 'approved' })
                } catch (error) {

                }
            }
            else {
                console.log('no secret key provided')
            }

        }
        else console.log('password is incorrect');
    }
    else {
        console.log('User does not exist')
        res.json({ errormessage: 'not registered' })
    }
}
export default verifyUser