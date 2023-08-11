import { Request } from "express";

type IRequestCustomBody<B> = Request<any, any, B, any>;
type IRequestCustomQuery<Q> = Request<any, any, any, Q>;
type IRequestCustomParams<P> = Request<P, any, any, any>;

export {
    IRequestCustomQuery,
    IRequestCustomParams,
    IRequestCustomBody
}