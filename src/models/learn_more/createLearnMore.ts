import { NextFunction } from "express";
import { ILearnMoreCreateInput } from "~/@types/learn_more";

const createLearnMore = async (input: ILearnMoreCreateInput, next: NextFunction) => {

    try {
        return await prismaClient.learnMore.create({
            select: {
                id: true,
                images: true,
                description: true,
                created_at: true,
            },
            data: {
                images: input.images,
                description: input.description,
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default createLearnMore;