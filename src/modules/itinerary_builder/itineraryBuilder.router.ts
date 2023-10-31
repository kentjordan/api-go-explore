import { Router } from "express";
import * as ItineraryBuilderServices from './itineraryBuilder.service';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import * as ItineraryBuilderValidators from '~/validators/itinerary_builder'
import { validateBody, validateParams } from "~/middlewares/validators/request.val";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody(ItineraryBuilderValidators.createItineraryBuilderItem),
    ItineraryBuilderServices.createItineraryBuilderItem
);

router.get('/',
    jwtAuth,
    ItineraryBuilderServices.getAllItineraryBuilderItems
);

router.put('/:id',
    jwtAuth,
    validateParams(ItineraryBuilderValidators.itinerarBuilderItemyId),
    validateBody(ItineraryBuilderValidators.updateItineraryBuilderItem),
    ItineraryBuilderServices.updateItineraryBuilderItemById
);

router.delete('/:id',
    jwtAuth,
    validateParams(ItineraryBuilderValidators.itinerarBuilderItemyId),
    ItineraryBuilderServices.deleteItineraryBuilderItemById
);

export default router;