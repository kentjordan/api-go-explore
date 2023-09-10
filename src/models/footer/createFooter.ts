import { NextFunction } from "express";
import { IFooterCreateInput } from "~/@types/modules/footer";

const createFooter = async (input: IFooterCreateInput, next: NextFunction) => {
    try {
        return await prismaClient.footer.create({
            select: {
                id: true,
                created_at: true,
                description: true
            },
            data: input
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default createFooter;