import { NextFunction, Request, Response } from "express";
import fs from 'node:fs';
import { IImageID } from "~/@types/images";
import { IRequestCustomParams } from "~/@types/request";
import { ExtractReqParams } from "~/utils/request.util";

export default class ImagesService {

    async uploadImage(req: Request, res: Response, next: NextFunction) {

        const img_filename = req.file?.filename;
        const img_url = `${global.api.url}/images/${img_filename}`;

        res.status(201).json({
            img_url,
        });

    }

    async updateImageById(req: IRequestCustomParams<IImageID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IImageID>(req);
        const updatedImage = req.file?.filename;

        if (!updatedImage) {
            res.status(400).json({
                message: 'Invalid given update image.'
            });
            return;
        }

        fs.unlink(`${uploadedFilesPath.images}/${id}`, (err) => {

            if (err?.code === 'ENOENT' || err?.code === 'EPERM') {
                res.status(404).json({ message: "File doesn\'t exists." });
                return;
            }

            fs.rename(`${uploadedFilesPath.images}/${updatedImage}`,
                `${uploadedFilesPath.images}/${id}`,
                (err: NodeJS.ErrnoException | null) => {

                    if (err) {
                        res.status(500).json({
                            message: 'An error occured when updating the image.'
                        });
                        return;
                    }

                });

            res.status(201).json({
                message: 'Image updated succesfully.'
            });

        });
    }

    async removeImage(req: IRequestCustomParams<IImageID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IImageID>(req);

        fs.unlink(`${uploadedFilesPath.images}/${id}`, (err) => {
            if (err?.code === 'ENOENT') {
                res.status(404).json({ message: 'File doesn\'t exists.' });
                return;
            }

            if (err) {
                res.status(500).json({ message: 'An error occured when deleting the file.' });
                return;
            }

            res.status(200).json({ message: 'File deleted successfully.' });

        });
    }

}