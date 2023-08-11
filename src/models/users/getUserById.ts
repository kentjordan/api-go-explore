import { NextFunction } from "express";

async function getUserById(id: string, next: NextFunction) {

    try {
        const user = await prismaClient.user.findFirstOrThrow({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                role: true,
                from_country: true,
                current_barangay: true,
                current_city: true,
                current_province: true
            },
            where: { id }
        });
        return user;
    } catch (error: unknown) {
        next(error);
    }

}

export default getUserById;