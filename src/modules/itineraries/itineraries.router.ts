import { Router } from "express";
import ItinerariesService from "./itineraries.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import * as ItineraryValidators from "~/validators/itinerary";
import {
    IItineraryID,
    IItineraryCreateInput
} from '~/@types/itinerary';

const router = Router();
const service = new ItinerariesService();

router.post('/item',
    jwtAuth,
    validateBody<IItineraryCreateInput>(ItineraryValidators.createItineraryItem),
    service.createItem
);

router.get('/item/:id',
    jwtAuth,
    validateParams<IItineraryID>(ItineraryValidators.itineraryId),
    service.getItemById
);

router.get('/items',
    jwtAuth,
    service.getAllItemsByUserId
);

router.put('/item/:id',
    jwtAuth,
    validateParams<IItineraryID>(ItineraryValidators.itineraryId),
    service.updateItemById
);

router.delete('/item/:id',
    jwtAuth,
    validateParams<IItineraryID>(ItineraryValidators.itineraryId),
    service.deleteItemById
);

router.get('/',
    jwtAuth,
    service.getAllItinerary
);

export default router;