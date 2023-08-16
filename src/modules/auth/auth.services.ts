import { NextFunction, Request, Response } from "express";
import { ILoginPost } from "~/@types/auth";
import { IRequestCustomBody } from "~/@types/request";
import * as AuthModules from '~/models/auth';
import { ReqBody } from "~/utils/request.util";

export default class AuthService {

    async login(req: IRequestCustomBody<ILoginPost>, res: Response, next: NextFunction) {

        const credentials = ReqBody<ILoginPost>(req);

        const loggedIn = await AuthModules.login(credentials, next);

        if (loggedIn) {
            res.status(200).json({ ...loggedIn });
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {

    }

}