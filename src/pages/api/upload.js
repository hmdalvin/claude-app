import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
    api: {
        bodyParser: false, // Matikan bodyParser agar bisa menangani FormData
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }

        const filePath = files.file.filepath;
        try {
            const uploadedResponse = await cloudinary.v2.uploader.upload(filePath, {
                upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
            });

            // Hapus file lokal setelah diunggah ke Cloudinary
            fs.unlinkSync(filePath);

            return res.status(200).json(uploadedResponse);
        } catch (error) {
            return res.status(500).json({ error: 'Upload failed', details: error.message });
        }
    });
}
