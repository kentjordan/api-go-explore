import { Response, NextFunction } from 'express';
import { ExtractReqBody, ExtractReqParams } from '~/utils/request.util';
import { ZodType } from 'zod';
import { IRequestCustomBody, IRequestCustomParams } from '~/@types/request';

function validateBody<T>(validator: ZodType) {

    return async (req: IRequestCustomBody<T>, res: Response, next: NextFunction) => {
        const credentials = ExtractReqBody<T>(req);

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

        const credentials = ExtractReqParams<T>(req);

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