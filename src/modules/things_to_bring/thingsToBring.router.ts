import { Router } from "express";
import * as ThingsToBringServices from './thingsToBring.service';
import * as ThingToBringValidators from '~/validators/things_to_bring';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IThingToBringCreateInput, IThingToBringIDInput } from "~/@types/modules/things_to_bring";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IThingToBringCreateInput>(ThingToBringValidators.createThingToBring),
    ThingsToBringServices.createThingToBring
);

router.get('/',
    ThingsToBringServices.getAllThingsToBring
);

router.get('/:thingsToBring_id',
    validateParams<IThingToBringIDInput>(ThingToBringValidators.thingToBringId),
    ThingsToBringServices.getThingToBringById
);

router.put('/:thingsToBring_id',
    jwtAuth,
    validateParams<IThingToBringIDInput>(ThingToBringValidators.thingToBringId),
    ThingsToBringServices.updateThingToBringById
);

router.delete('/:thingsToBring_id',
    jwtAuth,
    validateParams<IThingToBringIDInput>(ThingToBringValidators.thingToBringId),
    ThingsToBringServices.deleteThingToBringById
);

export default router;