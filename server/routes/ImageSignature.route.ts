import express from "express";
const router = express.Router()
import getSignature from "../controller.ts/Imagesignature.controller";


router.get('/',getSignature )

export default router