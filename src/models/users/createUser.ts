import { NextFunction } from "express";
import { IUserCreateInput } from "~/@types/users";
import { hash } from 'argon2'
import * as jwt from 'jsonwebtoken'

async function createUser(data: IUserCreateInput, next: NextFunction) {

    try {

        const hashedPassword = await hash(data.password);

        const db_res = await prismaClient.user.create({
            select: {
                id: true
            },
            data: {
                ...data,
                password: hashedPassword,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        });

        const access_token = jwt.sign({ ...db_res }, process.env.SECRET_KEY as string, { expiresIn: '8h' });
        const refresh_token = jwt.sign({ access_token }, process.env.SECRET_KEY as string, { expiresIn: '7d' });

        return {
            access_token,
            refresh_token
        };

    } catch (error) {
        next(error);
    }

}

export default createUser;