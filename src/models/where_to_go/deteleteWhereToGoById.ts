import { NextFunction } from "express";

const deleteWhereToGoById = async (whereToGo_id: string, next: NextFunction) => {

    try {

        await prismaClient.featuredThing.deleteMany({
            where: {
                wheretogo_id: whereToGo_id
            }
        });

        return await prismaClient.whereToGo.delete({
            where: {
                id: whereToGo_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteWhereToGoById;