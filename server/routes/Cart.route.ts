import express from 'express'
import addCartProduct from '../controller.ts/addCartProduct.controller'
import { AuthenticateUser } from '../utils/auth'
import getCarts from '../controller.ts/get_cart_products.controller'
const router = express.Router()


router.get('/products', getCarts)
router.post('/addProduct', AuthenticateUser, addCartProduct)


export default router
