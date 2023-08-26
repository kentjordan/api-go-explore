import { NextFunction } from "express";

async function getSearchedPlaceItems(q: string, next: NextFunction) {

    const search = q.trim().split(" ").join(" | ");

    try {
        return await prismaClient.place.findMany({
            select: {
                id: true,
                created_at: true,
                updated_at: true,
                category: true,
                title: true,
                description: true,
                photos: true,
                contact: true,
                social_links: true,
                province: true,
                city: true,
                barangay: true
            },
            where: {
                OR: [
                    {
                        province: {
                            search
                        }
                    },
                    {
                        city: {
                            search
                        }
                    },
                    {
                        barangay: {
                            search
                        }
                    },
                    {
                        title: {
                            search
                        }
                    },
                    {
                        description: {
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

export default getSearchedPlaceItems;