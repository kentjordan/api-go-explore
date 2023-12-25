import { NextFunction, Request, Response, Router } from "express";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import FeatureThingsService from "./featuredThing.service";
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";
import { ICreateFeaturedThingDto, createFeaturedThingScheme } from "./dto/create-featuredThings.dto";
import { IRequestCustomParams } from "~/@types/request";
import { IFeaturedThingID, featuredThingId } from "./dto/featuredThingId.dto";
import { IUpdateFeaturedThingDto, updateFeaturedThingScheme } from "./dto/update-featuredThings.dto";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";

const service = new FeatureThingsService();
const router = Router();

router.post('/',
    jwtAuth,
    validateBody(createFeaturedThingScheme),
    async (req: Request, res: Response, next: NextFunction) => {

        const body = ExtractReqBody<ICreateFeaturedThingDto>(req);

        try {
            const createdFeaturedThing = await service.createFeaturedThing(body);

            res.status(200).json({
                ...createdFeaturedThing
            });

        } catch (error) {
            next(error);
        }
    });

router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const featuredThings = await service.getAllFeaturedThings();

        res.status(200).json([...featuredThings]);

    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validateParams(featuredThingId),
    async (req: IRequestCustomParams<IFeaturedThingID>, res: Response, next: NextFunction) => {

        try {

            const { id } = ExtractReqParams<IFeaturedThingID>(req);
            const featuredThing = await service.getFeaturedThingById(id);

            res.status(200).json({
                ...featuredThing
            });

        } catch (error) {
            next(error);
        }
    });

router.patch('/:id',
    jwtAuth,
    validateParams(featuredThingId),
    validateBody(updateFeaturedThingScheme),
    async (req: IRequestCustomParams<IFeaturedThingID>, res: Response, next: NextFunction) => {

        try {
            const { id } = ExtractReqParams<IFeaturedThingID>(req);
            const body = ExtractReqBody<IUpdateFeaturedThingDto>(req);
            const updatedFeaturedThings = await service.updateFeaturedThing(body, id);

            res.status(200).json({
                ...updatedFeaturedThings
            });

        } catch (error) {
            next(error);
        }
    });

router.delete('/:id',
    jwtAuth,
    validateParams(featuredThingId),
    async (req: IRequestCustomParams<IFeaturedThingID>, res: Response, next: NextFunction) => {

        try {

            const { id } = ExtractReqParams<IFeaturedThingID>(req);
            const deletedFeaturedThings = await service.deleteFeaturedThing(id);

            res.status(200).json({
                ...deletedFeaturedThings
            });

        } catch (error) {
            next(error);
        }
    });

export default router;