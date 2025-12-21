import express from 'express'
import { AuthenticateUser } from '../utils/auth'
import getUser from '../controller.ts/getuser.controller'
const router = express.Router()


router.get('/', AuthenticateUser, getUser)
export default router