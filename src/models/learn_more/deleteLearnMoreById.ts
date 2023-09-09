import { NextFunction } from "express";
import { ILearnMoreIDInput } from "~/@types/modules/learn_more";

const deleteLearnMoreById = async (input: ILearnMoreIDInput, next: NextFunction) => {

    try {
        return await prismaClient.learnMore.delete({
            where: {
                id: input.learnMore_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteLearnMoreById;