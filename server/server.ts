import express from "express";
import cors from "cors"
import homeRoute from './routes/home.route'
import SignUpRoute from "./routes/signup.route";
import LoginRoute from "./routes/Login.route";
import addBuisnessRoute from "./routes/addBuisness.route";
import newBusinessRoute from "./routes/newbusiness.route";
import VerifyUserRoute from "./routes/verify_user.route";
import RefreshRoute from "./routes/refresh.routes";
import ImagesignatureRoute from "./routes/ImageSignature.route";
import getBusinessesRoute from "./routes/get_business.route";
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
dotenv.config()
app.use(cookieParser())

const PORT = 3000

app.use('/', homeRoute)
app.use('/signup', SignUpRoute)
app.use('/login', LoginRoute)
app.use('/add', addBuisnessRoute)
app.use('/NewBusiness', newBusinessRoute)
app.use('/verifyUser', VerifyUserRoute)
app.use('/refresh', RefreshRoute)
app.use('/getsignature', ImagesignatureRoute)

app.get('/buisnesses/:buisness', (req, res) => {
    console.log(req.params.buisness)
    const { accesstoken } = req.cookies
    if (!accesstoken) res.status(401).json({ message: 'access token not found ' })
})

app.use('/get_businesses',getBusinessesRoute)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

