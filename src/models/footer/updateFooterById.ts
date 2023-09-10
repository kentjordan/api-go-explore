import { NextFunction } from "express";
import { IFooterIDInput, IFooterUpdateInput } from "~/@types/modules/footer";

const updateFooterById = async (input: IFooterUpdateInput & IFooterIDInput, next: NextFunction) => {
    try {
        return await prismaClient.footer.update({
            select: {
                id: true,
                created_at: true,
                description: true
            },
            where: {
                id: input.footer_id,
            },
            data: {
                description: input.description
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateFooterById;