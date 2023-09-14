import { NextFunction, Request, Response } from "express"
import { IWhereToGoCreateInput, IWhereToGoIDInput, IWhereToGoUpdateInput } from "~/@types/modules/where_to_go";
import { IRequestCustomBody, IRequestCustomParams } from "~/@types/request";
import * as WhereToGoModels from '~/models/where_to_go';
import { ExtractReqBody, ExtractReqParams } from "~/utils/request.util";

const createWhereToGo = async (req: IRequestCustomBody<IWhereToGoCreateInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IWhereToGoCreateInput>(req);

    const createdWhereToGo = await WhereToGoModels.createWhereToGo(input, next);

    if (createdWhereToGo) {
        res.status(200).json({
            ...createdWhereToGo
        });
    }

}

const deleteWhereToGo = async (req: IRequestCustomParams<IWhereToGoIDInput>, res: Response, next: NextFunction) => {

    const { whereToGo_id } = ExtractReqParams<IWhereToGoIDInput>(req);
    const deletedWhereToGo = await WhereToGoModels.deleteWhereToGoById(whereToGo_id, next);

    if (deletedWhereToGo) {
        res.status(200).json({
            ...deletedWhereToGo
        });
    }

}

const getWhereToGoById = async (req: IRequestCustomParams<IWhereToGoIDInput>, res: Response, next: NextFunction) => {

    const { whereToGo_id } = ExtractReqParams<IWhereToGoIDInput>(req);

    const whereToGo = await WhereToGoModels.getWhereToGoById(whereToGo_id, next);

    if (whereToGo) {
        res.status(200).json({
            ...whereToGo
        });
    }

}

const getAllWhereToGo = async (req: Request, res: Response, next: NextFunction) => {

    const whereToGoItems = await WhereToGoModels.getAllWhereToGo(next);

    if (whereToGoItems) {
        res.status(200).json([...whereToGoItems]);
    }

}

const updateWhereToGoById = async (req: IRequestCustomParams<IWhereToGoIDInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IWhereToGoUpdateInput>(req);
    const { whereToGo_id } = ExtractReqParams<IWhereToGoIDInput>(req);

    const updatedWhereToGo = await WhereToGoModels.updateWhereToGoById({ ...input, whereToGo_id }, next);

    if (updatedWhereToGo) {
        res.status(200).json({
            ...updatedWhereToGo
        });
    }

}

export {
    createWhereToGo,
    deleteWhereToGo,
    getAllWhereToGo,
    updateWhereToGoById,
    getWhereToGoById
}