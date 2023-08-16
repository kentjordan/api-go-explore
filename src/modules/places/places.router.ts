import { Router } from "express";
import PlacesService from "./places.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody } from "~/middlewares/validators/request.val";
import { IPlaceCreateInput } from "~/@types/places";
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

router.put('/:id',
    jwtAuth,
    service.updatePlaceById
);

router.delete('/:id',
    jwtAuth,
    service.deletePlaceById
);

export default router;