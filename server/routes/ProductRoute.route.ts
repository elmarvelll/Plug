
import express from 'express'
import { addProduct } from '../controller.ts/addNewProduct.controller'
import { AuthenticateUser } from '../utils/auth'
import SearchProducts from '../controller.ts/getSearchProducts.controller'
import getCategoryProducts from '../controller.ts/getCategoryProducts.controller'
const router = express.Router()

router.post('/addProduct',AuthenticateUser, addProduct)
router.get('/searchRequest',SearchProducts)
router.get('/category',getCategoryProducts)
export default router