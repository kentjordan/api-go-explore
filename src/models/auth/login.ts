import { verify } from "argon2";
import { NextFunction } from "express";
import { ILoginPost } from "~/@types/auth";
import InvalidPasswordError from "~/errors/InvalidPasswordError";
import { generateTokens, isTokenExpired } from "~/utils/jwt.util";

enum LoginInfo {
    MAX_LOGGED_IN = 999999999,
    MAX_EXPIRED_TOKENS = 999999999
}

async function login(data: ILoginPost, next: NextFunction) {

    try {
        const db_res = await prismaClient.user.findFirstOrThrow({
            select: { id: true, password: true },
            where: { email: data.email }
        });

        const isPwdMatched = await verify(db_res.password, data.password);

        if (isPwdMatched) {
            const tokens = await generateTokens({ id: db_res.id });

            const loggedInCount = await prismaClient.loggedInHistory.count({ // COUNT the logged in info of the user by its id
                where: {
                    user_id: db_res.id
                }
            });

            const loggedInInfo = await prismaClient.loggedInHistory.findMany({ // GET the logged in info of the user by its id
                select: {
                    id: true,
                    user_id: true,
                    created_at: true,
                    refresh_token: true,
                },
                where: {
                    user_id: db_res.id
                }
            });

            // If logged in count exceeds MAX_LOGGED_IN, then DELETE all expired tokens
            if (loggedInCount >= LoginInfo.MAX_LOGGED_IN && loggedInInfo.length) {

                const expiredToken = loggedInInfo.map(async (e, i) => { // DELETE all expired tokens

                    const isIt = await isTokenExpired(e.refresh_token as string);

                    if (isIt) {
                        await prismaClient.loggedInHistory.delete({ // DELETE logged in info if the refresh token is expired
                            where: {
                                id: e.id,
                                user_id: e.user_id
                            }
                        });
                    }
                    return isIt;
                });

                if (expiredToken.length < LoginInfo.MAX_EXPIRED_TOKENS) { // CREATE a new one
                    await prismaClient.loggedInHistory.create({ // CREATE logged in info
                        data: {
                            refresh_token: tokens.refresh_token,
                            user_id: db_res.id,
                        }
                    });

                    return { ...tokens }
                }

                return {
                    message: "You're only allowed to logged in 999999999 different devices",
                }
            }

            await prismaClient.loggedInHistory.create({
                data: {
                    user_id: db_res.id,
                    refresh_token: tokens.refresh_token
                }
            });

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