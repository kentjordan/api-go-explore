import { NextFunction, Request, Response } from "express"

const createFooter = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        method: req.method,
        body: req.body
    });
}

const getAllFooters = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        method: req.method,
        body: req.body
    });
}

const getFooterById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        method: req.method,
        body: req.body
    });
}

const updateFooterById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        method: req.method,
        body: req.body
    });
}

const deleteFooterById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        method: req.method,
        body: req.body
    });
}

export {
    createFooter,
    getFooterById,
    updateFooterById,
    deleteFooterById
}