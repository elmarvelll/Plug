import { Request, Response } from "express"
import { comparePassword } from "../utils/hash"
import generatetoken from "../utils/generateTokens"
import db from "../utils/db"
 export type credential = {
    user_id: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    username: string,
    school_email: string,
    number: number,
    room: string,
    hall: string
}
const verifyUser = async (req: Request, res: Response) => {
    const credentials = req.body.credentials
    const [rows] = await db.query('SELECT * FROM users WHERE email = ? OR school_email = ?', [credentials.email,credentials.email])
    const users = rows as credential[]
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
                        maxAge: 1000 * 60 * 15
                    })
                    res.cookie('accesstoken', accesstoken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax',
                        maxAge: 1000 * 60 * 10
                    }).json({ approved: 'approved' })
                } catch (error) {
                   console.log('error from login controller')
                }
            }
            else {
                console.log('no secret key provided')
            }

        }
        else res.json({ errormessage: 'invalid password' })

    }
    else {
        console.log('User does not exist')
        res.json({ errormessage: 'invalid email' })
    }
}
export default verifyUser