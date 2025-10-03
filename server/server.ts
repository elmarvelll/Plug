import express from "express";
import cors from "cors"
import homeRoute from './routes/home.route'
import SignUpRoute from "./routes/signup.route";
import LoginRoute from "./routes/Login.route";
import authRoute from "./routes/auth.route";
import VerifyUserRoute from "./routes/verify_user.route";
import RefreshRoute from "./routes/refresh.routes";
import ImagesignatureRoute from "./routes/ImageSignature.route";
import ProductRoute from "./routes/ProductRoute.route";
import BusinessRoute from "./routes/Business.route";
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
app.use('/auth', authRoute)
app.use('/verifyUser', VerifyUserRoute)
app.use('/refresh', RefreshRoute)
app.use('/getsignature', ImagesignatureRoute)
app.use('/products', ProductRoute)
app.use('/business', BusinessRoute)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

