import express from 'express'
import { sendMessage } from '../controller.ts/homelcontroller'
const router = express.Router()

router.get('/',sendMessage)

export default router