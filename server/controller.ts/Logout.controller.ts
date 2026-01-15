import { Response, Request } from "express";

const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("refreshtoken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        res.clearCookie("accesstoken", {
            httpOnly: true,
            secure: false,
            sameSite: "strict"
        });
        console.log('logged out successfully')
        return res.status(200).json({ message: "Logged out" });

    } catch (error) {
        console.log('error logging out ' + error)
    }

}

export default Logout