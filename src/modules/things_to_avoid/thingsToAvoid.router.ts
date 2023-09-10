import { Router } from "express";
import * as ThingsToAvoidServices from './thingsToAvoid.service';
import * as ThingToAvoidValidators from '~/validators/things_to_avoid';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IThingToAvoidCreateInput, IThingToAvoidIDInput } from "~/@types/modules/things_to_avoid";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IThingToAvoidCreateInput>(ThingToAvoidValidators.createThingToAvoid),
    ThingsToAvoidServices.createThingToAvoid
);

router.get('/',
    ThingsToAvoidServices.getAllThingsToAvoid
);

router.get('/:thingsToAvoid_id',
    validateParams<IThingToAvoidIDInput>(ThingToAvoidValidators.thingToAvoidId),
    ThingsToAvoidServices.getThingToAvoidById
);

router.put('/:thingsToAvoid_id',
    jwtAuth,
    validateParams<IThingToAvoidIDInput>(ThingToAvoidValidators.thingToAvoidId),
    ThingsToAvoidServices.updateThingToAvoidById
);

router.delete('/:thingsToAvoid_id',
    jwtAuth,
    validateParams<IThingToAvoidIDInput>(ThingToAvoidValidators.thingToAvoidId),
    ThingsToAvoidServices.deleteThingToAvoidById
);

export default router;