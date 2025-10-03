
import express from 'express'
import { addProduct } from '../controller.ts/addNewProduct.controller'
import { AuthenticateUser } from '../utils/auth'
const router = express.Router()

router.post('/addProduct',AuthenticateUser, addProduct)
export default router