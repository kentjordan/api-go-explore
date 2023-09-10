import { NextFunction, Request, Response } from "express"
import { IFooterCreateInput, IFooterIDInput } from "~/@types/modules/footer";
import { IRequestCustomParams } from "~/@types/request";
import * as FooterModels from '~/models/footer'
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createFooter = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IFooterCreateInput>(req);

    const createdFooter = await FooterModels.createFooter(input, next);

    if (createdFooter) {
        res.status(200).json({
            ...createdFooter
        });
    }
}

const getAllFooters = async (req: Request, res: Response, next: NextFunction) => {

    const footers = await FooterModels.getAllFooter(next);

    if (footers) {
        res.status(200).json([...footers]);
    }

}

const getFooterById = async (req: IRequestCustomParams<IFooterIDInput>, res: Response, next: NextFunction) => {

    const { footer_id } = ExtractReqParams<IFooterIDInput>(req);
    const footer = await FooterModels.getFooterById(footer_id, next);

    if (footer) {
        res.status(200).json({
            ...footer
        });
    }

}

const updateFooterById = async (req: IRequestCustomParams<IFooterIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IFooterCreateInput>(req);
    const { footer_id } = ExtractReqParams<IFooterIDInput>(req);

    const updatedFooter = await FooterModels.updateFooterById({ footer_id, ...input }, next);

    if (updatedFooter) {
        res.status(200).json({
            ...updatedFooter
        });
    }
}

const deleteFooterById = async (req: IRequestCustomParams<IFooterIDInput>, res: Response, next: NextFunction) => {

    const { footer_id } = ExtractReqParams<IFooterIDInput>(req);
    const deletedFooter = await FooterModels.deleteFooterById(footer_id, next);

    if (deletedFooter) {
        res.status(200).json({
            ...deletedFooter
        });
    }
}

export {
    createFooter,
    getFooterById,
    updateFooterById,
    deleteFooterById,
    getAllFooters
}