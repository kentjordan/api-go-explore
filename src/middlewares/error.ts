import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { PrismaError } from "prisma-error-enum";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export default function error(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof PrismaClientKnownRequestError) {

        // POST: User email
        if (err.code === PrismaError.UniqueConstraintViolation) {
            res.status(422).json({ message: 'Given email is not available.' });
            return;
        }

        // DELETE, GET: User ID
        if (err.code === PrismaError.InconsistentColumnData) {
            res.status(422).json({ message: 'Invalid given user id.' });
            return;
        }

        // DELETE, GET with User ID
        if (err.code === PrismaError.RecordsNotFound) {
            res.status(404).json({ message: 'Given user id was not found.' });
            return;
        }

    }

    if (err instanceof ZodError) {
        const zodError = fromZodError(err);
        res.status(422).json(zodError);
        return;
    }

    res.status(500).json({ message: 'Internal server error.' });

}