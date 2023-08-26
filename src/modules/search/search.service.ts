import { Response, NextFunction } from "express";
import { IRequestCustomQuery } from "~/@types/request";
import { ISearchQueryInput } from "~/@types/search";
import { ExtractReqQuery } from "~/utils/request.util";
import * as SearchModels from "~/models/search";

export default class SearchService {

    async searchPlaces(req: IRequestCustomQuery<ISearchQueryInput>, res: Response, next: NextFunction) {

        const { q } = ExtractReqQuery<ISearchQueryInput>(req);

        const searchedPlaces = await SearchModels.getSearchedPlaces(q, next);

        if (searchedPlaces) {
            res.status(200).json({ searchedPlaces });
        }

    }

    async searchUsers(req: IRequestCustomQuery<ISearchQueryInput>, res: Response, next: NextFunction) {

        const { q } = ExtractReqQuery<ISearchQueryInput>(req);

        const searchedUsers = await SearchModels.getSearchedUsers(q, next);

        if (searchedUsers) {
            res.status(200).json({ searchedUsers });
        }

    }

}