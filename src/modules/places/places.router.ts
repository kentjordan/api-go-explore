import { Router, Request, Response } from "express";
import PlacesService from "./places.service";

const router = Router()
const service = new PlacesService();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: '/places' })

})

export default router;