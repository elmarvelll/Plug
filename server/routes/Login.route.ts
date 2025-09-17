import express from "express";
import { comparePassword } from "../utils/hash";
import verifyUser from "../controller.ts/Login.controller";

const router = express.Router()

router.post('/',verifyUser)

export default router