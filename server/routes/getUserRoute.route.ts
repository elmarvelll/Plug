import express from 'express'
import { AuthenticateUser } from '../utils/auth'
import getUser from '../controller.ts/getuser.controller'
import getUserDetails from '../controller.ts/getUserDetails.controller'
import updateUser from '../controller.ts/updateUser.controller'
import Logout from '../controller.ts/Logout.controller'
import getUserNotifications from '../controller.ts/getUserNotifications.controller'
import UpdateUserNotifications from '../controller.ts/UpdateUserNotifications.controller'
import getUnreadNotifications from '../controller.ts/getUnreadNotifications.controller'
const router = express.Router()


router.get('/', AuthenticateUser, getUser)
router.get('/user_details', AuthenticateUser, getUserDetails)
router.get('/notifications', AuthenticateUser, getUserNotifications)
router.get('/unread_notifications', getUnreadNotifications)
router.put('/notifications', UpdateUserNotifications)
router.put('/:userID', updateUser)
router.post('/logout', Logout)
export default router