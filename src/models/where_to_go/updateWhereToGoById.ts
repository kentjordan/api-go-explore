import { NextFunction } from "express";
import { IWhereToGoIDInput, IWhereToGoUpdateInput } from "~/@types/modules/where_to_go";

const updateWhereToGoById = async (input: IWhereToGoUpdateInput & IWhereToGoIDInput, next: NextFunction) => {
    try {
        return await prismaClient.whereToGo.update({
            where: {
                id: input.whereToGo_id
            },
            data: {
                description: input.description,
                images: input.images,
                title: input.title,
                updated_at: new Date().toISOString()
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateWhereToGoById;