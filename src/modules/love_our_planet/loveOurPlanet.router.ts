import { Router } from "express";
import * as LoveOurPlanetServices from './loveOurPlanet.service';
import * as LoveOurPlanetValidators from '~/validators/love_our_planet';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { ILoveOurPlanetCreateInput, ILoveOurPlanetIDInput, ILoveOurPlanetUpdateInput } from "~/@types/modules/love_our_planet";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<ILoveOurPlanetCreateInput>(LoveOurPlanetValidators.createLoveOurPlanet),
    LoveOurPlanetServices.createLoveOurPlanet
);

router.get('/:loveOurPlanet_id',
    validateParams<ILoveOurPlanetIDInput>(LoveOurPlanetValidators.loveOurPlanetId),
    LoveOurPlanetServices.getLoveOurPlanetById
);

router.get('/',
    LoveOurPlanetServices.getAllLoveOurPlanet
);

router.put('/:loveOurPlanet_id',
    jwtAuth,
    validateParams<ILoveOurPlanetIDInput>(LoveOurPlanetValidators.loveOurPlanetId),
    validateBody<ILoveOurPlanetUpdateInput>(LoveOurPlanetValidators.updateLoveOurPlanet),
    LoveOurPlanetServices.updateLoveOurPlanet
);

router.delete('/:loveOurPlanet_id',
    jwtAuth,
    validateParams<ILoveOurPlanetIDInput>(LoveOurPlanetValidators.loveOurPlanetId),
    LoveOurPlanetServices.deleteLoveOurPlanetById
);

export default router;