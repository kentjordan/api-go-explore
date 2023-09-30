import { NextFunction } from "express";
import { IUserUpdateInput } from "~/@types/users";
import { hash } from 'argon2'

async function updateUser(id: string, data: IUserUpdateInput, next: NextFunction) {
    try {

        const hashedPassword = data.password && await hash(data.password);

        const user = await prismaClient.user.update({
            select: { id: true },
            data: {
                ...data,
                password: hashedPassword,
                updated_at: new Date().toISOString()
            },
            where: { id }
        });

        return {
            ...user
        };
    } catch (error: unknown) {
        next(error);
    }
}

export default updateUser;