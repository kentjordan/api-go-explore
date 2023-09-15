import * as WhereToStayModels from '~/models/where_to_stay';
import { NextFunction, Request, Response } from "express"
import { IRequestCustomQuery } from "~/@types/request";
import { ExtractReqQuery } from "~/utils/request.util";

interface IWhereToStayQuery {
    city: string,
    limit: string
}

const getWhereToStay = async (req: IRequestCustomQuery<IWhereToStayQuery>, res: Response, next: NextFunction) => {

    const { city, limit } = ExtractReqQuery<IWhereToStayQuery>(req);

    const whereToStayByCity = await WhereToStayModels.getWhereToStay(city, parseInt(limit), next);

    if (whereToStayByCity) {
        res.status(200).json([...whereToStayByCity]);
    }

}

export {
    getWhereToStay
}