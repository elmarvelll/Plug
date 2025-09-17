import dotenv from 'dotenv'
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { hashPassword } from "../utils/hash";
import db from "../utils/db";
import generatetoken from "../utils/generateTokens"

dotenv.config()


export const SaveCredentials = async (req: Request, res: Response) => {
    const { credentials } = req.body
    const { email, password, first_name, last_name, username } = credentials
    console.log(password)
    const userId = uuidv4()
    const hash = hashPassword(password)
        .then(data => {
            db.query('INSERT INTO users(user_id , email, password, first_name, last_name, username) VALUES  (?,?,?,?,?,?)', [userId, email, data, first_name, last_name, username])
        })
        .then(() => {
            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }
            const {accesstoken,refreshtoken} = generatetoken(userId, process.env.JWT_SECRET)
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

            res.json({ token: accesstoken })
        })
}   