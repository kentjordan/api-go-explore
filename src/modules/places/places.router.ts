import { Router } from "express";
import PlacesService from "./places.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IPlaceCreateInput, IPlaceID, IPlaceUpdateInput } from "~/@types/places";
import * as PlaceValidator from '~/validators/places';


const router = Router()
const service = new PlacesService();

router.post('/',
    jwtAuth,
    validateBody<IPlaceCreateInput>(PlaceValidator.createPlace),
    service.createPlace
);

router.get('/',
    jwtAuth,
    service.getPlaces
);

router.get('/:id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    service.getPlaceById
);

router.put('/:id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    validateBody<IPlaceUpdateInput>(PlaceValidator.updatePlace),
    service.updatePlaceById
);

router.delete('/:id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    service.deletePlaceById
);

export default router;