import { NextFunction } from "express";

const getUsersByRole = async (role: 'ADMIN' | 'REGULAR', next: NextFunction) => {
    try {

        const user = await prismaClient.user.findMany({
            where: {
                role
            }
        });

        return user.map((e, i) => ({
            ...e,
            password: '********'
        }));

    } catch (error: unknown) {
        next(error);
    }
}

export default getUsersByRole;