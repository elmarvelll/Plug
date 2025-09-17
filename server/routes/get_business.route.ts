import express from 'express'
import UploadBusinesses from '../controller.ts/get_business.controller'

const router = express.Router()

router.get('/',UploadBusinesses)

export default router