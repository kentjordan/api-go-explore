import { NextFunction } from "express";

const deleteFooterById = async (footer_id: string, next: NextFunction) => {
    try {
        return await prismaClient.footer.delete({
            where: {
                id: footer_id
            }
        })
    } catch (error: unknown) {
        next(error);
    }
}

export default deleteFooterById;