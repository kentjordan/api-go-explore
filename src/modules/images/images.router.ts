import { Router, Request, Response } from "express";
import ImagesService from "./images.service";

const router = Router()
const service = new ImagesService();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: '/images' })

});

export default router;