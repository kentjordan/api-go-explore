import { Router } from "express";
import AuthService from "./auth.services";
import { validateBody } from "~/middlewares/validators/request.val";
import { ILoginPost } from "~/@types/auth";
import * as AuthValidator from "~/validators/auth";

const router = Router();
const service = new AuthService();

router.post('/login',
    validateBody<ILoginPost>(AuthValidator.login),
    service.login
);

export default router;