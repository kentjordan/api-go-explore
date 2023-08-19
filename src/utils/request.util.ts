import { Request } from "express";
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";

export function ExtractReqBody<B>(req: IRequestCustomBody<B>): B {
    return req.body;
}

export function ExtractReqParams<P>(req: IRequestCustomParams<P>): P {
    return req.params;
}

export function ExtractReqQuery<Q>(req: IRequestCustomQuery<Q>): Q {
    return req.query;
}

export function ExtractReqUser(req: Request): Express.User {
    return req.user as Express.User;
}