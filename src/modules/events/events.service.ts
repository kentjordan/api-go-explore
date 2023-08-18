import { NextFunction, Request, Response } from "express";
import { IEventCreateInput } from "~/@types/events";
import { ReqBody } from "~/utils/request.util";
import * as EventsModels from "~/models/events";
import { IRequestCustomBody } from "~/@types/request";

export default class EventsService {

    async createEvent(req: IRequestCustomBody<IEventCreateInput>, res: Response, next: NextFunction) {

        const eventInfo = ReqBody<IEventCreateInput>(req);

        const event = await EventsModels.createEvent(eventInfo, next);

        if (event) {
            res.status(201).json({
                ...event,
                message: "Event successfully created.",
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

    async getEventById(req: Request, res: Response, next: NextFunction) {

    }

    async updateEventById(req: Request, res: Response, next: NextFunction) {

    }

    async deleteEventById(req: Request, res: Response, next: NextFunction) {

    }

}