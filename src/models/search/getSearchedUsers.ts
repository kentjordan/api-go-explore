import { NextFunction } from "express";

async function getSearchedUsers(q: string, next: NextFunction) {

    const search = q.trim().split(" ").join(" | ");

    try {
        return await prismaClient.user.findMany({
            select: {
                created_at: true,
                updated_at: true,
                id: true,
                first_name: true,
                last_name: true,
                gender: true,
                email: true,
                role: true,
                from_country: true,
                current_barangay: true,
                current_city: true,
                current_province: true
            },
            where: {
                OR: [
                    {
                        first_name: {
                            search
                        }
                    },
                    {
                        last_name: {
                            search
                        }
                    },
                    {
                        email: {
                            search
                        }
                    },
                    {
                        current_barangay: {
                            search
                        }
                    },
                    {
                        current_city: {
                            search
                        }
                    },
                    {
                        current_province: {
                            search
                        }
                    },
                    {
                        from_country: {
                            search
                        }
                    }
                ],
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default getSearchedUsers;