import express from "express";
import getRefrshToken from "../controller.ts/refresh.controller";
const router = express.Router()

router.get('/',getRefrshToken)

export default router