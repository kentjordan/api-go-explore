import { IRequestCustomBody, IRequestCustomParams, IRequestCustomQuery } from "~/@types/request";

export function ReqBody<B>(req: IRequestCustomBody<B>): B {
    return req.body;
}

export function ReqParams<P>(req: IRequestCustomParams<P>): P {
    return req.params;
}

export function ReqQuery<Q>(req: IRequestCustomQuery<Q>): Q {
    return req.query;
}