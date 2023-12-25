import { ICreateFeaturedThingDto } from "./dto/create-featuredThings.dto";
import { IUpdateFeaturedThingDto } from "./dto/update-featuredThings.dto";

export default class FeatureThingsService {

    async createFeaturedThing(body: ICreateFeaturedThingDto) {
        return await prismaClient.featuredThing.create({
            data: {
                ...body,
                category: body.category.toLowerCase()
            }
        });
    }

    async getAllFeaturedThings() {

        let featuredThings = await prismaClient.$queryRaw<Array<{ place_id: string }>>`
            SELECT *
            FROM "FeaturedThing"`;

        const x = await Promise.allSettled(featuredThings.map(async (e, i) => {
            const featuredPlace = await prismaClient.$queryRaw<Array<{}>>`
                SELECT *
                FROM "Place"
                WHERE id = ${e.place_id}::UUID`;

            return {
                place: featuredPlace,
                ...e
            }
        }));

        return x.map((e: any) => {
            return {
                ...e.value
            }
        })
    }

    async getFeaturedThingById(id: string) {

        const [featuredThing] = await prismaClient.$queryRaw < Array<{ place_id: string }>>`
            SELECT *
            FROM "FeaturedThing"
            WHERE id = ${id}::UUID`;


        if (featuredThing) {
            const [featuredPlace] = await prismaClient.$queryRaw<Array<{}>>`
            SELECT *
            FROM "Place"
            WHERE id = ${featuredThing.place_id}::UUID`;

            return {
                place: featuredPlace,
                ...featuredThing
            }
        }

        return {
            message: "Featured thing not found",
            statusCode: 404
        }

    }

    async updateFeaturedThing(body: IUpdateFeaturedThingDto, id: string) {
        return await prismaClient.featuredThing.update({
            where: {
                id
            },
            data: {
                ...body,
                updated_at: new Date().toISOString(),
                category: body.category?.toLowerCase()
            }
        });
    }

    async deleteFeaturedThing(id: string) {
        return await prismaClient.featuredThing.delete({
            where: {
                id
            }
        });
    }

}