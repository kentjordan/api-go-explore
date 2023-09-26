import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';

const uploadImage = multer({
    limits: {
        fileSize: 1e+7, // 50MB
    },
    storage: diskStorage({
        destination(req, file, callback) {

            const doesPathExists = fs.existsSync(uploadedFilesPath.images);

            if (!doesPathExists) {
                fs.mkdirSync(uploadedFilesPath.images, { recursive: true });
            }

            callback(null, uploadedFilesPath.images);
        },
        filename(req, file, callback) {
            callback(null, uuidv4());
        },
    }),
});

export default uploadImage;