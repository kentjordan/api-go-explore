import { ICreateSeasonDto } from "./dto/create-season.dto";
import { IUpdateSeasonDto } from "./dto/update-season.dto";

export default class SeasonService {

    async getAllSeason() {
        return await prismaClient.season.findMany();
    }

    async getAllSpecificSeason(season_id: string) {
        return await prismaClient.season.findMany({
            where: {
                id: season_id
            }
        });
    }

    async createSeason(dto: ICreateSeasonDto) {
        return prismaClient.season.create({
            data: {
                ...dto,
            }
        });
    }

    async createPlaceSeason(place_id: string, season_id: string) {
        return await prismaClient.place.update({
            where: {
                id: place_id,
            },
            data: {
                season_id
            }
        });
    }

    async deletePlaceSeason(place_id: string) {
        return await prismaClient.place.update({
            where: {
                id: place_id,
            },
            data: {
                season_id: null
            }
        });
    }

    async updateSeason(season_id: string, dto: IUpdateSeasonDto) {
        return prismaClient.season.update({
            data: {
                ...dto,
                updated_at: new Date().toISOString()
            },
            where: {
                id: season_id
            }
        });
    }

    async deleteSeason(season_id: string) {

        await prismaClient.$queryRaw`
            UPDATE "Place"
            SET season_id = NULL
            WHERE season_id = ${season_id}::UUID`;

        return prismaClient.season.delete({
            where: {
                id: season_id
            }
        });
    }

}