import { verify } from "argon2";
import { NextFunction } from "express";
import { ILoginPost } from "~/@types/auth";
import InvalidPasswordError from "~/errors/InvalidPasswordError";
import { generateTokens } from "~/utils/jwt.util";

async function login(data: ILoginPost, next: NextFunction) {

    try {
        const db_res = await prismaClient.user.findFirstOrThrow({
            select: { id: true, password: true },
            where: {
                email: data.email
            }
        });

        const isPwdCorrect = await verify(db_res.password, data.password);

        if (isPwdCorrect) {
            const tokens = await generateTokens({ id: db_res.id });

            return {
                ...tokens
            }
        }

        throw new InvalidPasswordError(400, 'Invalid password');

    } catch (error: unknown) {
        next(error);
    }

}

export default login;