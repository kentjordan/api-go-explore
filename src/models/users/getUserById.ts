import { NextFunction } from "express";

async function getUserById(id: string, next: NextFunction) {

    try {
        return await prismaClient.user.findFirstOrThrow({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                from_country: true,
                current_city: true,
                current_province: true,
                profile_photo: true,
                updated_at: true,
                gender: true,
                created_at: true
            },
            where: { id }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getUserById;