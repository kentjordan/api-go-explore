import { Router } from "express";
import ImagesService from "./images.service";
import uploadImage from "~/middlewares/files/multer";
import { jwtAuth } from '~/middlewares/auth/jwtAuth'
import { validateParams } from "~/middlewares/validators/request.val";
import { IImageID } from "~/@types/images";
import * as ImageValidator from '~/validators/images';

const router = Router()
const service = new ImagesService();

router.post('/',
    jwtAuth,
    uploadImage.single('photo'),
    service.uploadImage
);

router.put('/:id',
    jwtAuth,
    validateParams<IImageID>(ImageValidator.imageId),
    uploadImage.single('photo'),
    service.updateImageById
);

router.delete('/:id',
    jwtAuth,
    validateParams<IImageID>(ImageValidator.imageId),
    service.removeImage
);

export default router;