// reads in the cloudinary env variable - put this before
import { v2 as cloudinary } from "cloudinary";

// we're aliasing version 2 and referencing with a variable
// cloudinary picks up env and is now configured
// console.log(cloudinary.config().cloud_name);

// Node.js SDK Uploader function returns a Promise
const uploadImage = async (filePath: string, filName: string) => {
    cloudinary.config(true)
    // const filePath = path.join(__dirname, '../assets', filName);

    const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "farming-pool-assets",
        public_id: filName
    })
    return uploadResult.url;
}

const getImagesFromCloudinary = async  () => {
    try {
        cloudinary.config(true)
        const images = await cloudinary.search
            .expression(`folder:farming-pool-assets/*`)
            .execute();
        return images;
    } catch (error: any) {
        console.error('Error getting images from cloudinary: ', error.message);
        return [];
    }
}

export { uploadImage, getImagesFromCloudinary };
