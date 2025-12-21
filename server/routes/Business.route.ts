import express from 'express'
import get_all_Business from '../controller.ts/GetALLBusiness.controller'
import { AuthenticateUser } from '../utils/auth'
import save_to_db from '../controller.ts/newbusiness.controller'
import getBusinesses from '../controller.ts/get_business.controller'
import { addProduct } from '../controller.ts/addNewProduct.controller'
import get_products from '../controller.ts/getProducts'
import updateBusiness from '../controller.ts/updateBusiness'
import Getproduct from '../controller.ts/Getproduct'
import updateProduct from '../controller.ts/updateProduct'
import Allbusinesses from '../controller.ts/Allbusinesses'
import Allproducts from '../controller.ts/allproducts'
import showBusiness from '../controller.ts/show_business.controller'
import showProducts from '../controller.ts/showproducts.controller'
import showProduct from '../controller.ts/showproduct.controller'
import verify_account from '../controller.ts/verifyAccountDetails.controller'
import getBankDetails from '../controller.ts/getBankAccount.controller'
import getBusinessStatistics from '../controller.ts/getBusinessStats.controller'
const router = express.Router()
export interface Business {
  id: number;
  number: string;
  email: string;
  businessName: string;
  category: string;
  businessDescription: string;
  deliveryTime: string;
  hall: string;
  roomNumber: string;
  createdAt: string;   // ISO date string
  ownerId: number;
};
export interface Product {
  id: string;                // UUID
  business_id: string;       // UUID of the business
  name: string;
  description: string;
  price: number;             // stored as number for calculations
  stock: number;
  public_url: string;        // from Cloudinary
  secure_url: string;        // from Cloudinary
  status: "active" | "inactive" // product state
  created_at: string;        // ISO date string from backend
  updated_at: string;        // ISO date string from backend
}

router.get('/getBusiness', AuthenticateUser, get_all_Business)
router.get('/allBusiness', Allbusinesses)
router.get('/allProducts', Allproducts)
router.get('/verify_account',verify_account)
router.get('/get_bank_account',getBankDetails )
router.post('/new', AuthenticateUser, save_to_db)
router.get('/:businessID', AuthenticateUser, showBusiness)
router.get('/:businessID/products', AuthenticateUser, showProducts)
router.get('/:businessID/product', AuthenticateUser, showProduct)
router.post('/:business/new_product', AuthenticateUser, addProduct)
router.get('/mybusiness/:business', AuthenticateUser, getBusinesses)
router.get('/mybusiness/:business/get_business_stats',AuthenticateUser,getBusinessStatistics)
router.get('/mybusiness/:business/products', AuthenticateUser, get_products)
router.get('/mybusiness/:business/:productID', AuthenticateUser, Getproduct)
router.put('/mybusiness/:business/:productID', AuthenticateUser, updateProduct)
router.put('/:business', updateBusiness)

export default router