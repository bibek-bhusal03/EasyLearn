import { v2 as cloudinary, UploadApiOptions } from 'cloudinary'; // Import UploadApiOptions type

import stream from 'stream';
import { env } from '../env';

const CLOUD_NAME = env.cloudinary.cloud_name;
const API_KEY = env.cloudinary.api_key;
const API_SECRET = env.cloudinary.api_secret;

try {
    cloudinary.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
        secure: true, 
    });
    console.log("[DEBUG] Cloudinary configuration successful.");
} catch (configError) {
    console.error("[ERROR] Failed to configure Cloudinary:", configError.message);
}
// export  const cloudinaryConfig=   cloudinary.config({
//         cloud_name: CLOUD_NAME,
//         api_key: API_KEY,
//         api_secret: API_SECRET,
//         secure: true, 
//     });
// export const getSignedUrl = async (publicId: string): Promise<string> => {
//     return await cloudinary.url(publicId, {
//         resource_type: 'raw',
//         secure: true,
//         format: 'pdf',
//     });
// }

/**
 * Uploads a file buffer using the streaming method to Cloudinary.
 * This is ideal for handling files received from API requests (e.g., Express/Multer).
 * @param {Buffer} buffer - The file data buffer (e.g., from an API request).
 * @param {string} folder - The target folder in your Cloudinary account.
 * @returns {Promise<any>} The Cloudinary result object containing the URL and metadata.
 */
// Added type annotation for buffer and return value
export const uploadBufferToCloudinary = (buffer: Buffer, folder = 'uploads'): Promise<any> => {
    if (!buffer || !(buffer instanceof Buffer)) {
        console.error("[DEBUG] Validation Error: Input is not a valid Buffer.");
        return Promise.reject(new Error("A valid file buffer must be provided for upload."));
    }
    if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
        console.error("[DEBUG] Configuration Error: Cloudinary credentials are not fully set.");
        return Promise.reject(new Error("Cloudinary API credentials are required for authenticated upload."));
    }

    console.log(`[DEBUG] Attempting to upload buffer (${buffer.length} bytes) to folder: ${folder}`);

    return new Promise((resolve, reject) => {
        const uploadOptions: UploadApiOptions = {
            folder: folder,
            resource_type: 'raw' 
        };

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions, 
            (error, result) => {
                if (error) {
                    console.error(`[ERROR] Cloudinary Upload Stream Failed to finish.`);
                    console.error(`[ERROR] Cloudinary Message: ${error.message}`);
                    if (error.http_code) {
                        console.error(`[ERROR] HTTP Status Code: ${error.http_code}`);
                    }
                    return reject(new Error(`Upload failed: ${error.message || 'Unknown stream error'}`));
                }
                
                console.log(`[DEBUG] Upload successful! Public ID: ${result.public_id}`);
                console.log(`[DEBUG] Access URL: ${result.secure_url}`);
                console.log("[DEBUG] Full Cloudinary response object:");
                console.log({
                    url: result.secure_url,
                    bytes: result.bytes,
                    format: result.format,
                    resource_type: result.resource_type
                });

                resolve(result);
            }
        );

        const readable = new stream.PassThrough();
        readable.end(buffer); 
        readable.pipe(uploadStream);
        
        readable.on('error', (e) => {
            console.error('[ERROR] Readable stream encountered an issue:', e.message);
            uploadStream.emit('error', e);
        });
    });
};
