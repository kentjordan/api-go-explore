import { Router } from "express";
import SearchService from "./search.service";
import { validateQuery } from "~/middlewares/validators/request.val";
import { ISearchQueryInput } from "~/@types/search";
import * as SearchValidators from '~/validators/search';

const router = Router();
const service = new SearchService();

router.get('/place',
    validateQuery<ISearchQueryInput>(SearchValidators.searchQuery),
    service.searchPlaces
);

router.get('/user',
    validateQuery<ISearchQueryInput>(SearchValidators.searchQuery),
    service.searchUsers
);

export default router;