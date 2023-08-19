import { Request, Response, NextFunction } from 'express'
import { IPlaceCreateInput, IPlaceID, IPlaceUpdateInput } from '~/@types/places'
import { ExtractReqBody, ExtractReqParams } from '~/utils/request.util'
import * as PlaceModels from '~/models/places';
import { IRequestCustomParams } from '~/@types/request';

export default class PlacesService {

    async createPlace(req: Request, res: Response, next: NextFunction) {

        const placeInfo = ExtractReqBody<IPlaceCreateInput>(req);

        const place = await PlaceModels.createPlace(placeInfo, next);

        if (place) {
            res.status(201).json({ ...place });
        }

    }

    async getPlaceById(req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IPlaceID>(req);

        const place = await PlaceModels.getPlaceById(id, next);

        if (place) {
            res.status(200).json({ ...place });
        }

    }

    // TODO: Provide a query for pagination
    async getPlaces(req: Request, res: Response, next: NextFunction) {

        const places = await PlaceModels.getPlaces(next);

        if (places) {
            res.status(200).json([...places]);
        }

    }

    async updatePlaceById(req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IPlaceID>(req);
        const updateIput = ExtractReqBody<IPlaceUpdateInput>(req);

        const updatedPlace = await PlaceModels.updatePlaceById(id, updateIput, next);

        if (updatedPlace) {
            res.status(201).json({ ...updatedPlace });
        }

    }

    async deletePlaceById(req: IRequestCustomParams<IPlaceID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IPlaceID>(req);

        const deletedPlace = await PlaceModels.deletePlaceById(id, next);

        if (deletedPlace) {
            res.status(200).json({ ...deletedPlace });
        }

    }

}