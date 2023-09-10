import { NextFunction } from "express";
import { IThingToBringIDInput, IThingToBringUpdateInput } from "~/@types/modules/things_to_bring";

const updateFooterById = async (input: IThingToBringUpdateInput & IThingToBringIDInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToBring.update({
            where: {
                id: input.thingsToBring_id,
            },
            data: {
                updated_at: new Date().toISOString(),
                images: input.images,
                title: input.title,
                description: input.description
            }
        });
    } catch (error: unknown) {
        next(error);
    }
}

export default updateFooterById;