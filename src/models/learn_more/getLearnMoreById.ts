import { NextFunction } from "express";
import { ILearnMoreIDInput } from "~/@types/learn_more";

const getLearnMoreById = async (input: ILearnMoreIDInput, next: NextFunction) => {

    try {
        return await prismaClient.learnMore.findUniqueOrThrow({
            where: {
                id: input.learnMore_id
            }
        });

    } catch (error: unknown) {
        next(error);
    }
}

export default getLearnMoreById;