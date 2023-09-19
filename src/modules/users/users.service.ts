import { NextFunction, Request, Response } from "express";
import { IUserCreateInput, IUserID, IUserUpdateInput } from "~/@types/users";
import * as UserModels from "~/models/users";
import { ExtractReqBody, ExtractReqParams, ExtractReqQuery } from "~/utils/request.util";
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";
import { userRoleQuery } from "~/validators/users";

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

        const { user_id } = ExtractReqParams<IUserID>(req);

        const user = await UserModels.getUserById(user_id, next);

        if (user) {
            res.status(200).json({ ...user });
        }

    }

    async getUsers(req: IRequestCustomQuery<{ role: 'ADMIN' | 'REGULAR' }>, res: Response, next: NextFunction) {

        const query = ExtractReqQuery<{ role: 'ADMIN' | 'REGULAR' }>(req);

        if (!query.role) {
            const users = await UserModels.getUsersByRole('REGULAR', next);

            if (users) {
                res.status(200).json([...users]);
                return;
            }
        }

        try {
            userRoleQuery.parse(query);
        } catch (error: unknown) {
            next(error);
            return;
        }

        const users = await UserModels.getUsersByRole(query.role, next);

        if (users) {
            res.status(200).json([...users]);
            return;
        }

    }

    async updateUser(req: IRequestCustomBody<IUserUpdateInput>, res: Response, next: NextFunction) {

        const { user_id } = ExtractReqParams<IUserID>(req);
        const updateInput = ExtractReqBody<IUserUpdateInput>(req);

        const user = await UserModels.updateUser(user_id, updateInput, next);

        if (user) {
            res.status(201).json({
                ...user,
                message: 'User updated successfully.',
                type: 'UPDATE'
            });
        }

    }

    async deleteUser(req: IRequestCustomQuery<IUserID>, res: Response, next: NextFunction) {

        const { user_id } = ExtractReqParams<IUserID>(req);

        const user = await UserModels.deleteUserById(user_id, next);

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