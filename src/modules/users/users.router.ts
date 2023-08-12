import { Router } from "express";
import UsersService from "./users.service";
import { validateBody, validateParams } from "~/middlewares/validators/users.val";
import * as UserValidator from '~/validators/users';
import { IUserCreateInput, IUserID, IUserUpdateInput } from '~/@types/users';

const router = Router();
const service = new UsersService();

router.post('/',
    validateBody<IUserCreateInput>(UserValidator.createUser),
    service.createUser);

router.get('/:id',
    validateParams<IUserID>(UserValidator.userId),
    service.getUserById);

router.get('/', service.getUsers);

router.put('/:id',
    validateParams<IUserID>(UserValidator.userId),
    validateBody<IUserUpdateInput>(UserValidator.updateUser),
    service.updateUser);

router.delete('/:id',
    validateParams<IUserID>(UserValidator.userId),
    service.deleteUser);

export default router;