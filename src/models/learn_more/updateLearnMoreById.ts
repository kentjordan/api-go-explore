import { NextFunction } from "express";
import { ILearnMoreUpdateInput } from "~/@types/learn_more";

const updateLearnMoreById = async (id: string, input: ILearnMoreUpdateInput, next: NextFunction) => {

    try {
        return await prismaClient.learnMore.update({
            select: {
                id: true,
                images: true,
                description: true,
                created_at: true,
            },
            data: {
                images: input.images,
                description: input.description,
            },
            where: {
                id: id
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateLearnMoreById;