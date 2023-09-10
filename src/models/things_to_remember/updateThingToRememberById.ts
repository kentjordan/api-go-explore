import { NextFunction } from "express";
import { IThingToRememberIDInput, IThingToRememberUpdateInput } from "~/@types/modules/things_to_remember";

const updateThingToRememberById = async (input: IThingToRememberUpdateInput & IThingToRememberIDInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToRemember.update({
            where: {
                id: input.thingsToRemember_id,
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

export default updateThingToRememberById;