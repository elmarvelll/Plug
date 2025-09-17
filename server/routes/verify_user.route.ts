import express from 'express'
import verifcheck from '../controller.ts/verifyUser.controller'
const router = express.Router()

router.get('/',verifcheck)


export default router