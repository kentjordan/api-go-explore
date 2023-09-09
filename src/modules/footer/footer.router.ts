import { Router } from "express";
import * as FooterServices from './footer.service';
import * as FooterValidators from '~/validators/footer';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { IFooterCreateInput, IFooterIDInput } from "~/@types/modules/footer";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<IFooterCreateInput>(FooterValidators.createFooter),
    FooterServices.createFooter
);

router.get('/:footer_id',
    validateParams<IFooterIDInput>(FooterValidators.footerId),
    FooterServices.getFooterById
);

router.put('/:footer_id',
    jwtAuth,
    validateParams<IFooterIDInput>(FooterValidators.footerId),
    FooterServices.updateFooterById
);

router.delete('/:footer_id',
    jwtAuth,
    validateParams<IFooterIDInput>(FooterValidators.footerId),
    FooterServices.deleteFooterById
);

export default router;