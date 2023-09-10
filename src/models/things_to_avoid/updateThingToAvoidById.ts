import { NextFunction } from "express";
import { IThingToAvoidIDInput, IThingToAvoidUpdateInput } from "~/@types/modules/things_to_avoid";

const updateThingToAvoidById = async (input: IThingToAvoidUpdateInput & IThingToAvoidIDInput, next: NextFunction) => {
    try {
        return await prismaClient.thingToAvoid.update({
            where: {
                id: input.thingsToAvoid_id,
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

export default updateThingToAvoidById;