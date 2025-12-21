
import express from 'express'
import { addProduct } from '../controller.ts/addNewProduct.controller'
import { AuthenticateUser } from '../utils/auth'
import SearchProducts from '../controller.ts/getSearchProducts.controller'
const router = express.Router()

router.post('/addProduct',AuthenticateUser, addProduct)
router.get('/searchRequest',SearchProducts)
export default router