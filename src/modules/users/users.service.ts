import { NextFunction, Request, Response } from "express";
import { IUserCreateInput, IUserID, IUserUpdateInput } from "~/@types/users";
import * as UserModels from "~/models/users";
import { ReqBody, ReqParams } from "~/utils/request.util";
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";

export default class UsersService {

    async createUser(req: Request, res: Response, next: NextFunction) {

        const userCredentials = ReqBody<IUserCreateInput>(req);

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

        const { id } = ReqParams<IUserID>(req);

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

        const { id } = ReqParams<IUserID>(req);
        const updateInput = ReqBody<IUserUpdateInput>(req);

        const updatedUser = await UserModels.updateUser(id, updateInput, next);

        if (updatedUser?.isUpdated) {
            res.status(201).json({ message: 'User updated successfully.' });
        }

    }

    async deleteUser(req: IRequestCustomQuery<IUserID>, res: Response, next: NextFunction) {

        const { id } = ReqParams<IUserID>(req);

        const deletedUser = await UserModels.deleteUserById(id, next);

        if (deletedUser?.isDeleted) {
            res.status(200).json({ message: 'User deleted successfully.' });
            return;
        }
    }

}