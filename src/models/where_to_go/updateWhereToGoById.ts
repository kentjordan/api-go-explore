import { NextFunction } from "express";
import { IWhereToGoIDInput, IWhereToGoUpdateInput } from "~/@types/modules/where_to_go";

const updateWhereToGoById = async (input: IWhereToGoUpdateInput, whereToGo_id: string, next: NextFunction) => {
    try {
        return await prismaClient.whereToGo.update({
            where: {
                id: whereToGo_id
            },
            data: {
                ...input,
                updated_at: new Date().toISOString()
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateWhereToGoById;