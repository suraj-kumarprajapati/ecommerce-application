import dotenv from "dotenv";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config({ path: "backend/config/config.env" });

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload an image

export const uploadFile = async (file, folder) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            resource_type : auto,
            folder : folder,
        });

        return {
            public_id : result.public_id,
            url : result.url,
        }
    }
    catch(error) {
        throw error;
    }
}


export const deleteFile = async (file) => {
    const res = await cloudinary.uploader.destroy(file);

    if(res.result === 'ok')
        return true;
}