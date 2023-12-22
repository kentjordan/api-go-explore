import { ICreateSeasonDto } from "./dto/create-season.dto";
import { IUpdateSeasonDto } from "./dto/update-season.dto";

export default class SeasonService {

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

    async updateSeason(season_id: string, dto: IUpdateSeasonDto) {
        return prismaClient.season.update({
            data: {
                ...dto
            },
            where: {
                id: season_id
            }
        });
    }

    async deleteSeason(season_id: string) {
        return prismaClient.season.delete({
            where: {
                id: season_id
            }
        });
    }

}