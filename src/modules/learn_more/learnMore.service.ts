import { NextFunction, Request, Response } from "express"
import { ILearnMoreCreateInput, ILearnMoreIDInput, ILearnMoreUpdateInput } from "~/@types/learn_more";
import { IRequestCustomParams } from "~/@types/request";
import * as LearnMoreModels from '~/models/learn_more';
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createLearnMore = async (req: Request, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<ILearnMoreCreateInput>(req);

    const createdLearnMore = await LearnMoreModels.createLearnMore(input, next);

    if (createdLearnMore) {
        res.status(200).json({
            ...createdLearnMore
        });
    }

}

const getLearnMoreById = async (req: IRequestCustomParams<ILearnMoreIDInput>, res: Response, next: NextFunction) => {

    const params = ExtractReqParams<ILearnMoreIDInput>(req)

    const learnMoreById = await LearnMoreModels.getLearnMoreById(params, next);

    if (learnMoreById) {
        res.status(200).json({
            ...learnMoreById
        });
    }
}

const updateLearnMoreById = async (req: IRequestCustomParams<ILearnMoreIDInput>, res: Response, next: NextFunction) => {

    const { learnMore_id } = ExtractReqParams<ILearnMoreIDInput>(req);
    const input = ExtractReqBody<ILearnMoreUpdateInput>(req);

    const updatedLearnMoreById = await LearnMoreModels.updateLearnMoreById(learnMore_id, input, next);

    if (updatedLearnMoreById) {
        res.status(200).json({
            ...updatedLearnMoreById
        });
    }
}

const deleteLearnMoreById = async (req: IRequestCustomParams<ILearnMoreIDInput>, res: Response, next: NextFunction) => {
    const params = ExtractReqParams<ILearnMoreIDInput>(req)

    const deletedLearnMoreById = await LearnMoreModels.deleteLearnMoreById(params, next);

    if (deletedLearnMoreById) {
        res.status(200).json({
            ...deletedLearnMoreById
        });
    }
}

export {
    createLearnMore,
    getLearnMoreById,
    updateLearnMoreById,
    deleteLearnMoreById
}