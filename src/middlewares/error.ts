import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { PrismaError } from "prisma-error-enum";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import InvalidPasswordError from "~/errors/InvalidPasswordError";

export default function error(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof InvalidPasswordError) {
        res.status(err.code).json({ message: 'Invalid password.' });
        return;
    }

    if (err instanceof PrismaClientKnownRequestError) {

        // POST: User email
        if (err.code === PrismaError.UniqueConstraintViolation) {
            res.status(422).json({ message: 'Given email is not available.' });
            return;
        }

        // DELETE, GET: User ID
        if (err.code === PrismaError.InconsistentColumnData) {
            res.status(422).json({ message: 'Invalid given resource.' });
            return;
        }

        // DELETE, GET with User ID
        if (err.code === PrismaError.RecordsNotFound) {
            res.status(404).json({ message: 'Given resource was not found.' });
            return;
        }

    }

    if (err instanceof ZodError) {
        const zodError = fromZodError(err);
        res.status(422).json(zodError);
        return;
    }

    if (err instanceof MulterError) {
        res.status(500).json({
            message: err.message,
            name: err.name,
            code: err.code
        });
        return;
    }

    if (process.env.NODE_ENV.trim() === 'development') {
        console.log('error.ts', err);
    }

    res.status(500).json({ message: 'Internal server error.' });

}