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

router.get('/getBusiness',AuthenticateUser, get_all_Business)
router.get('/allBusiness',Allbusinesses)
router.get('/allProducts',Allproducts)
router.post('/new', AuthenticateUser, save_to_db)
router.get('/mybusiness/:business', AuthenticateUser, getBusinesses)
router.get('/:business',AuthenticateUser,showBusiness)
router.post('/:business/new_product', AuthenticateUser, addProduct)
router.get('/:business/products', AuthenticateUser, get_products)
router.get('/:business/:productID', AuthenticateUser, Getproduct)
router.put('/:business/:productID',AuthenticateUser,updateProduct)
router.put('/:business', updateBusiness)

export default router