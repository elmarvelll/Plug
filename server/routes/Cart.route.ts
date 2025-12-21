import express from 'express'
import addCartProduct from '../controller.ts/addCartProduct.controller'
import { AuthenticateUser } from '../utils/auth'
import getCarts from '../controller.ts/get_cart_products.controller'
import updateCartProduct from '../controller.ts/updateCartProduct.controller'
const router = express.Router()


router.get('/products', getCarts)
router.post('/addProduct', AuthenticateUser, addCartProduct)
router.put('/products', updateCartProduct)


export default router
