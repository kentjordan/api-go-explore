import { NextFunction } from "express";

const getAllLearnMore = async (next: NextFunction) => {
    try {
        return await prismaClient.learnMore.findMany();
    } catch (error: unknown) {
        next(error);
    }
}
export default getAllLearnMore;