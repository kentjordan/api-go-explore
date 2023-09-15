import { Router } from "express";
import * as WhereToGoServices from "./whereToGo.service";
import * as WhereToGoValidators from "~/validators/where_to_go";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IWhereToGoCreateInput, IWhereToGoIDInput } from "~/@types/modules/where_to_go";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IWhereToGoCreateInput>(WhereToGoValidators.createWhereToGo),
    WhereToGoServices.createWhereToGo
);

router.get('/',
    WhereToGoServices.getAllWhereToGo
);

router.get('/nearby',
    WhereToGoServices.getWhereToGoNearby
);

router.get('/:whereToGo_id',
    validateParams<IWhereToGoIDInput>(WhereToGoValidators.whereToGoId),
    WhereToGoServices.getWhereToGoById
);

router.delete('/:whereToGo_id',
    jwtAuth,
    validateParams<IWhereToGoIDInput>(WhereToGoValidators.whereToGoId),
    WhereToGoServices.deleteWhereToGo
);

router.put('/:whereToGo_id',
    jwtAuth,
    validateParams<IWhereToGoIDInput>(WhereToGoValidators.whereToGoId),
    validateBody<IWhereToGoCreateInput>(WhereToGoValidators.updateWhereToGo),
    WhereToGoServices.updateWhereToGoById
);

export default router;