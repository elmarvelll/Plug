import express from 'express';
import save_to_db from '../controller.ts/newbusiness.controller';
import { AuthenticateUser } from '../utils/auth';

const router = express.Router()

router.post('/',AuthenticateUser, save_to_db) 

export default router