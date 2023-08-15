import multer, { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const uploadImage = multer({
    storage: diskStorage({
        destination(req, file, callback) {
            callback(null, uploadedFilesPath.images);
        },
        filename(req, file, callback) {
            callback(null, uuidv4());
        },
    }),
});

export default uploadImage;