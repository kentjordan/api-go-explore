import { NextFunction, Request, Response } from "express";
import { IEventCreateInput, IEventID, IEventUpdateInput } from "~/@types/events";
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";
import * as EventsModels from "~/models/events";
import { IRequestCustomBody, IRequestCustomParams } from "~/@types/request";

export default class EventsService {

    async createEvent(req: IRequestCustomBody<IEventCreateInput>, res: Response, next: NextFunction) {

        const eventInfo = ExtractReqBody<IEventCreateInput>(req);

        const event = await EventsModels.createEvent(eventInfo, next);

        if (event) {
            res.status(201).json({
                ...event,
                message: "Event has been successfully created.",
                type: "CREATE"
            });
        }
    }

    async getEvents(req: Request, res: Response, next: NextFunction) {

        const events = await EventsModels.getEvents(next);

        if (events) {
            res.status(200).json([...events]);
        }
    }

    async getEventById(req: IRequestCustomParams<IEventID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IEventID>(req);

        const event = await EventsModels.getEventById(id, next);

        if (event) {
            res.status(200).json({ ...event });
        }
    }

    async updateEventById(req: IRequestCustomParams<IEventID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IEventID>(req);
        const data = ExtractReqBody<IEventUpdateInput>(req);

        const event = await EventsModels.updateEventById(data, id, next);

        if (event) {
            res.status(201).json({
                ...event,
                message: 'Event has been successfully updated.',
                type: 'UPDATE'
            });
        }
    }

    async deleteEvents(req: Request, res: Response, next: NextFunction) {

        const deletedEvents = await EventsModels.deleteEvents(next);

        if (deletedEvents) {
            res.status(200).json({
                message: `Total of (${deletedEvents.count}) events has been successfully deleted.`,
                type: 'DELETE'
            });
        }

    }

    async deleteEventById(req: IRequestCustomParams<IEventID>, res: Response, next: NextFunction) {

        const { id } = ExtractReqParams<IEventID>(req);

        const event = await EventsModels.deleteEventById(id, next);

        if (event) {
            res.status(200).json({
                ...event,
                message: 'Event has been succeessfully deleted.',
                type: 'DELETE'
            });
        }
    }

}