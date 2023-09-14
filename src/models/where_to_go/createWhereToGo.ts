import { NextFunction } from "express";
import { IWhereToGoCreateInput } from "~/@types/modules/where_to_go";

const createWhereToGo = async (input: IWhereToGoCreateInput, next: NextFunction) => {
    try {
        return await prismaClient.whereToGo.create({
            data: input
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default createWhereToGo;