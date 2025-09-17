import { AuthenticateUser } from "../utils/auth";
import { addBuisness } from "../controller.ts/addBuisness.controller";
import express from "express";
const router = express.Router()
 
router.get('/', AuthenticateUser, addBuisness)

export default router