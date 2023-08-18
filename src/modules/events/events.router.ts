import { Router } from "express";
import EventsService from "./events.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import * as EventsValidator from '~/validators/events';
import { IEventCreateInput, IEventID } from "~/@types/events";

const router = Router();
const service = new EventsService();

router.post('/',
    jwtAuth,
    validateBody<IEventCreateInput>(EventsValidator.createEvent),
    service.createEvent
);

router.get('/:id',
    jwtAuth,
    validateParams<IEventID>(EventsValidator.eventId),
    service.getEventById
);

router.get('/',
    service.getEvents
);

export default router;