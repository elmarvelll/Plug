import { AuthenticateUser } from "../utils/auth";
import express from "express";
const router = express.Router()
 
router.get('/', AuthenticateUser)

export default router