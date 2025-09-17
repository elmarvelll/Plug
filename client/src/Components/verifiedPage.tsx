import axios from "axios"

async function verifyUser(): Promise<boolean> {
    let isVerified: boolean = false

    try {
        const response = await axios.get('http://localhost:3000/verifyUser',{ withCredentials: true })
        console.log(await response.data.isVerified)
        return response.data.isVerified
    } catch (error) {
        isVerified = false
        // try {
        // const refreshResponse = await axios.get('http://localhost:3000/refresh', {withCredentials: true})
        // return refreshResponse.data.isVerified
        // } catch (error) {
        //  console.log(error)
        // }
        console.log(error)
        return isVerified
    }
}
export default verifyUser
