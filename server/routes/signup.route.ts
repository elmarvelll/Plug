import express from 'express'
import { SaveCredentials } from "../controller.ts/signup.controller";
const router = express.Router()

router.post('/', SaveCredentials)

export default router