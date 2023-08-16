import { Request, Response, NextFunction } from 'express'
import { IPlaceCreateInput } from '~/@types/places'
import { ReqBody } from '~/utils/request.util'
import * as PlaceModels from '~/models/places';

export default class PlacesService {

    async createPlace(req: Request, res: Response, next: NextFunction) {

        const placeInfo = ReqBody<IPlaceCreateInput>(req);

        const place = await PlaceModels.createPlace(placeInfo, next);

        if (place) {
            res.status(201).json({ ...place });
        }

    }

    async getPlaceById(req: Request, res: Response, next: NextFunction) {

    }

    // Provide a query for pagination
    async getPlaces(req: Request, res: Response, next: NextFunction) {

    }

    async updatePlaceById(req: Request, res: Response, next: NextFunction) {

    }

    async deletePlaceById(req: Request, res: Response, next: NextFunction) {

    }

}