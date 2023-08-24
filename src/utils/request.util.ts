import { Request } from "express";
import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";

function ExtractReqBody<B>(req: IRequestCustomBody<B>): B {
    return req.body;
}

function ExtractReqParams<P>(req: IRequestCustomParams<P>): P {
    return req.params;
}

function ExtractReqQuery<Q>(req: IRequestCustomQuery<Q>): Q {
    return req.query;
}

function ExtractReqUser(req: Request): Express.User {
    return req.user as Express.User;
}

export {
    ExtractReqBody,
    ExtractReqParams,
    ExtractReqQuery,
    ExtractReqUser,
}