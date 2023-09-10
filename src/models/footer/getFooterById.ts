import { NextFunction } from "express";

const getFooterById = async (footer_id: string, next: NextFunction) => {

    try {
        return await prismaClient.footer.findUniqueOrThrow({
            where: {
                id: footer_id
            }
        });
    } catch (error: unknown) {
        next(error);
    }

}

export default getFooterById;