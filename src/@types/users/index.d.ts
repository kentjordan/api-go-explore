import { createUser, updateUser, userId } from '~/validators/users';
import { z } from 'zod';

type IUserID = z.infer<typeof userId>;
type IUserCreateInput = z.infer<typeof createUser>;
type IUserUpdateInput = z.infer<typeof updateUser>;

export {
    IUserID,
    IUserCreateInput,
    IUserUpdateInput
}