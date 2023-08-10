import { Request, Response, Router } from "express";
import SearchService from "./search.service";

const router = Router()
const service = new SearchService();

router.post('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: '/search' });

})

export default router;