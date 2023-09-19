import { NextFunction } from "express";

async function getUsers(next: NextFunction) {
    try {
        const user = await prismaClient.user.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                from_country: true,
                current_barangay: true,
                current_city: true,
                current_province: true,
                created_at: true,
                updated_at: true,
                gender: true,
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

export default getUsers;