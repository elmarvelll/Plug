import axios from "axios"

const new_axios = axios.create()
const cloudinary_api_key = '573798579528838'
const cloud_name = 'djrv5ctvt'

async function uploadImg(imgfile: File | null) {
    if (imgfile !== null) {
        try {
            const imgres = await axios.get('http://localhost:3000/getsignature')
            const signature = imgres.data.signature
            const timestamp = imgres.data.timestamp

            const formData = new FormData();
            formData.append("file", imgfile);
            formData.append("api_key", cloudinary_api_key);
            formData.append("timestamp", timestamp);
            formData.append("signature", signature);
            const cloudinary_res = await new_axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
            const data = await cloudinary_res.data
            console.log('uploaded successfully')
            return data
        } catch (error) {
            console.log('error uploading image')
        }
    }
    else {
        console.log('there is no file chosen')
    }
}

export default uploadImg