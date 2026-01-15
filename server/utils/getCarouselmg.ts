import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
export const getCarouselImage = (publicId: string) => {
    return cloudinary.url(publicId, {
        width: 900,
        height: 500,
        crop: "fill",
        gravity: "auto", 
        quality: "auto",
        fetch_format: "auto",
    });
};