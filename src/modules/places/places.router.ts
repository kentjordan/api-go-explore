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
    service.getPlaces
);

router.get('/:place_id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    service.getPlaceById
);

router.put('/:place_id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    validateBody<IPlaceUpdateInput>(PlaceValidator.updatePlace),
    service.updatePlaceById
);

router.delete('/:place_id',
    jwtAuth,
    validateParams<IPlaceID>(PlaceValidator.placeId),
    service.deletePlaceById
);

export default router;