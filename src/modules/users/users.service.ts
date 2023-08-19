import { NextFunction, Request, Response } from "express";
import { IUserCreateInput, IUserID, IUserUpdateInput } from "~/@types/users";
import * as UserModels from "~/models/users";
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";

export default class UsersService {

    async createUser(req: Request, res: Response, next: NextFunction) {

        const userCredentials = ExtractReqBody<IUserCreateInput>(req);

        const user = await UserModels.createUser(userCredentials, next);

        if (user) {

            res.status(201).json({
                access_token: user.access_token,
                refresh_token: user.refresh_token
            });

            return;
        }

    }

    async getUserById(req: IRequestCustomParams<IUserID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IUserID>(req);

        const user = await UserModels.getUserById(id, next);

        if (user) {
            res.status(200).json({ ...user });
        }

    }

    async getUsers(req: Request, res: Response, next: NextFunction) {

        const users = await UserModels.getUsers(next);

        if (users) {
            res.status(200).json([...users]);
        }

    }

    async updateUser(req: IRequestCustomBody<IUserUpdateInput>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IUserID>(req);
        const updateInput = ExtractReqBody<IUserUpdateInput>(req);

        const user = await UserModels.updateUser(id, updateInput, next);

        if (user) {
            res.status(201).json({
                ...user,
                message: 'User updated successfully.',
                type: 'UPDATE'
            });
        }

    }

    async deleteUser(req: IRequestCustomQuery<IUserID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IUserID>(req);

        const user = await UserModels.deleteUserById(id, next);

        if (user) {
            res.status(200).json({
                ...user,
                message: 'User deleted successfully.',
                type: 'DELETE'
            });
            return;
        }
    }

}