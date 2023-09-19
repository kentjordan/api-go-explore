import { Router } from "express";
import UsersService from "./users.service";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import * as UserValidator from '~/validators/users';
import { IUserCreateInput, IUserID, IUserUpdateInput } from '~/@types/users';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";

const router = Router();
const service = new UsersService();

router.post('/',
    validateBody<IUserCreateInput>(UserValidator.createUser),
    service.createUser
);

router.get('/:user_id',
    jwtAuth,
    validateParams<IUserID>(UserValidator.userId),
    service.getUserById
);

router.get('/',
    service.getUsers
);

router.put('/:user_id',
    jwtAuth,
    validateParams<IUserID>(UserValidator.userId),
    validateBody<IUserUpdateInput>(UserValidator.updateUser),
    service.updateUser
);

router.delete('/:user_id',
    jwtAuth,
    validateParams<IUserID>(UserValidator.userId),
    service.deleteUser
);

export default router;