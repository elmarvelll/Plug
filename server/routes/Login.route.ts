import express from "express";
import { comparePassword } from "../utils/hash";
import verifyUser from "../controller.ts/Login.controller";
import verif_google_login from "../controller.ts/verif_google_login.controller";

const router = express.Router()

router.post('/',verifyUser)
router.post('/oauth/google',verif_google_login)

export default router