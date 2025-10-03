import dotenv from 'dotenv'
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from "../utils/hash";
import db from "../utils/db";
import generatetoken from "../utils/generateTokens"
import { credential } from './Login.controller';

dotenv.config()


export const SaveCredentials = async (req: Request, res: Response) => {
    const { credentials } = req.body
    const { email, password, first_name, last_name, number, hall, room, school_email } = credentials
    const userId = uuidv4()
    const encrypted_password = await hashPassword(password)
    const actual_schoolemail = `${school_email}@stu.cu.edu.ng`
    const num = Number(number)
    const [emailcheck] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    const [school_emailcheck] = await db.query('SELECT * FROM users WHERE school_email = ?', [actual_schoolemail])

    const emailVerif = emailcheck as credential[]
    const school_emailVerif = school_emailcheck as credential[]

    try {
        if (emailVerif.length !== 0 && school_emailVerif.length !== 0) {
            const err = new Error('emails already exist')
            err.name = 'identical_emails'
            throw err
        }
        if (emailVerif.length !== 0) {
            const err = new Error('email already exists')
            err.name = 'identical_email'
            throw err
        }

        if (school_emailVerif.length !== 0) {
            const err = new Error('school email already exists')
            err.name = 'identical_school_email'
            throw err
        }

        await db.query('INSERT INTO users(user_id , email, password, first_name, last_name, school_email, number,room,hall) VALUES  (?,?,?,?,?,?,?,?,?)',
            [userId, email, encrypted_password, first_name, last_name, `${school_email}@stu.cu.edu.ng`, num, room, hall])

        try {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            const { accesstoken, refreshtoken } = generatetoken(userId, process.env.JWT_SECRET)
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
            console.log('error saving cookie from signUp controller')
        }
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.name === 'identical_emails') {
                res.json({ IdenticalEmail: 'email identical', identicalSchoolEmail: 'school email identical' })
            }
            if (err.name === 'identical_email') {
                res.json({ IdenticalEmail: 'email identical' })
            }
            else if (err.name === 'identical_school_email') {
                res.json({ identicalSchoolEmail: 'school email identical' })
            }
        }
        console.log(err)
    }

}   