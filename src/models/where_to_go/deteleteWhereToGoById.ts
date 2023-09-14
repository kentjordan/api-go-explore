import { NextFunction } from "express";

const deleteWhereToGoById = async (whereToGo_id: string, next: NextFunction) => {

    try {
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