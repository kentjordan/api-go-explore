import { NextFunction, Request, Response, Router } from "express";
import SeasonService from './seasons.service';
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";
import { ICreateSeasonDto, createSeasonSchema } from "./dto/create-season.dto";
import { ISeasonIdSchema, seasonIdSchema } from "./dto/id-season.dto";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { updateSeasonschema } from "./dto/update-season.dto";
import { placeId } from "~/validators/places";
import { IPlaceID } from "~/@types/places";

const seasonService = new SeasonService();
const router = Router();

router.post('/', jwtAuth,
    validateBody(createSeasonSchema),
    async (req: Request, res: Response, next: NextFunction) => {

        const dto = ExtractReqBody<ICreateSeasonDto>(req);

        try {
            const createdSeason = await seasonService.createSeason(dto);

            res.status(200).json({
                ...createdSeason
            });

        } catch (error) {
            next(error);
        }
    });

router.post('/place/:place_id', jwtAuth,
    validateParams(placeId),
    validateBody(seasonIdSchema),
    async (req: Request<IPlaceID>, res: Response, next: NextFunction) => {

        const { place_id } = ExtractReqParams(req);
        const { season_id } = ExtractReqBody<ISeasonIdSchema>(req);

        try {

            const createdPlaceSeason = await seasonService.createPlaceSeason(place_id, season_id);

            res.status(200).json({
                ...createdPlaceSeason
            });

        } catch (error) {
            next(error);
        }
    });

router.get('/', (req: Request, res: Response) => {

});

router.patch('/', jwtAuth,
    validateParams(seasonIdSchema),
    validateBody(updateSeasonschema),
    async (req: Request<ISeasonIdSchema>, res: Response, next: NextFunction) => {

        const { season_id } = ExtractReqParams<ISeasonIdSchema>(req);
        const dto = ExtractReqBody<ICreateSeasonDto>(req);

        try {
            const updatedSeason = await seasonService.updateSeason(season_id, dto);

            res.status(200).json({
                ...updatedSeason
            });

        } catch (error) {
            next(error);
        }

    });

router.delete('/:season_id', jwtAuth,
    async (req: Request<ISeasonIdSchema>, res: Response, next: NextFunction) => {

        const { season_id } = ExtractReqParams<ISeasonIdSchema>(req);

        try {
            const deletedSeason = await seasonService.deleteSeason(season_id);

            res.status(200).json({
                ...deletedSeason
            });

        } catch (error) {
            next(error);
        }

    });

export default router;