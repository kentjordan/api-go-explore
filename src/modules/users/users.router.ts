import { Router, Request, Response } from "express";
import UsersService from "./users.service";

const router = Router()
const service = new UsersService();

router.post('/', (req: Request, res: Response) => {
    res.status(200).json({ msg: '/users' })
})

export default router;