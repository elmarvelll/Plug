import axios, { type AxiosRequestConfig } from "axios";
import { useNavigate} from "react-router-dom";


const seperateAxios = axios.create({
    withCredentials: true
})

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    skipInterceptor?: boolean;
}
export interface Axios_Req_With_Url extends AxiosRequestConfig {
   Link: string
}


export default function axios_config() {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true
    axios.interceptors.response.use(
        res => res,
        async (err) => {
            const originalRequest = err.config
            if (originalRequest.skipInterceptor) {
                return Promise.reject(err);
            }
            if (err.response.status === 401 && !originalRequest.retry) {
                originalRequest.retry = true
                try {
                    console.log('refresh')
                    await seperateAxios.get('http://localhost:3000/refresh', { skipInterceptor: true } as CustomAxiosRequestConfig)
                    return axios(originalRequest)
                } catch (error) {
                    navigate('/login', { state: { expected_path: originalRequest.Link } })
                    return Promise.reject(error);
                }
            }
            else {
                console.log('error')
                return Promise.reject(err)
            }
        }
    )

    // axios.interceptors.request.use(
    //     async (req) => {
    //         console.log(req)
    //         try {
    //             await seperateAxios.get('http://localhost:3000/verifyUser')
    //                 .catch((err) => {
    //                     if (err.status === 401) {
    //                         console.log(err.status)

    //                     }

    //                 })
    //         }
    //         catch (error) {
    //             console.log('error')
    //             return Promise.reject(error)
    //         }
    //         return req
    //     },
    //     err => console.log(err)
    // )
}
