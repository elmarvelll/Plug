import { Response, Request } from "express";
import db from "../utils/db";
import { credential } from "./Login.controller";
import generatetoken from "../utils/generateTokens";
async function verif_google_login(req: Request, res: Response) {
    const { email } = req.body
    const [query] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    const [second_query] = await db.query('SELECT * FROM users WHERE school_email = ?', [email])

    const users = query as credential[]
    const other_users = second_query as credential[]
    if (users.length !== 0) {
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
                }).status(201).json({ approved: 'approved' })
            } catch (error) {
                console.log('error from google oauth login controller')
            }
        } else {
            console.log('no secret key provided')
        }
    }
    else if (other_users.length !== 0) {
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
                }).status(201).json({ approved: 'approved' })
            } catch (error) {
                console.log('error from google oauth login controller')
            }
        }
        else {
            console.log('no secret key provided')
        }
    }
    else {
        console.log('email is not logged in')
        res.json({ errormessage: 'invalid password' })
    }

}
export default verif_google_login