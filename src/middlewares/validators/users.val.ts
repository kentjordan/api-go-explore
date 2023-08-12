import { Response, NextFunction } from 'express';
import { ReqBody, ReqParams } from '~/utils/request.util';
import { ZodType } from 'zod';
import { IRequestCustomBody, IRequestCustomParams } from '~/@types/request';

function validateBody<T>(validator: ZodType) {

    return async (req: IRequestCustomBody<T>, res: Response, next: NextFunction) => {
        const credentials = ReqBody<T>(req);

        try {
            await validator.parseAsync(credentials);
            next();
        } catch (error: unknown) {
            next(error);
        }
    }
}

function validateParams<T>(validator: ZodType) {

    return async (req: IRequestCustomParams<T>, res: Response, next: NextFunction) => {

        const credentials = ReqParams<T>(req);

        try {
            await validator.parseAsync(credentials);
            next();
        } catch (error: unknown) {
            next(error);
        }

    }
}

export {
    validateBody,
    validateParams
}