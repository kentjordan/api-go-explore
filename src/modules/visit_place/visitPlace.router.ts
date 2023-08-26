import { Router } from "express";
import * as service from './visitPlace.service';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateParams } from "~/middlewares/validators/request.val";
import { IPlaceID } from "~/@types/places";
import * as PlacesValidator from "~/validators/places";

const router = Router();

router.post('/:place_id/user/anon',
    service.visitPlaceByUserAnon
);

router.post('/:place_id/user',
    jwtAuth,
    validateParams<IPlaceID>(PlacesValidator.placeId),
    service.visitPlaceByUserId
);

export default router;