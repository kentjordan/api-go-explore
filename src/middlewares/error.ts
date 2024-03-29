import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { MulterError } from "multer";
import { PrismaError } from "prisma-error-enum";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import InvalidPasswordError from "~/errors/InvalidPasswordError";

export default function error(err: unknown, req: Request, res: Response, next: NextFunction) {

    if (err instanceof InvalidPasswordError) {
        res.status(err.code).json({
            message: 'Invalid password.',
            db_err_type: 'Not Matched',
            type: 'Database Error',
        });
        return;
    }

    if (err instanceof PrismaClientKnownRequestError) {

        if (err.code === PrismaError.UniqueConstraintViolation) {
            res.status(422).json({
                message: 'Given resource is not available.',
                db_err_type: 'Unique Constraint Violation',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.InconsistentColumnData) {
            res.status(422).json({
                message: 'Invalid given resource.',
                db_err_type: 'Inconsistent Column Data',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.RecordsNotFound) {
            res.status(404).json({
                message: 'Given resource was not found.',
                db_err_type: 'Records Not Found',
                type: 'Database Error',
            });
            return;
        }

        if (err.code === PrismaError.ForeignConstraintViolation) {
            res.status(404).json({
                message: 'No records found on all tables for the given resource.',
                db_err_type: 'Foreign Constraint Violation',
                type: 'Database Error',
            });
            return;
        }

    }

    if (err instanceof PrismaClientUnknownRequestError) {
        res.status(400).json({
            message: 'Bad Request',
            db_err_type: 'Please provide an valid input.',
            type: 'Database Error',
        });
        return;
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

    console.log(err);

    res.status(500).json({ message: 'Internal server error.' });

}