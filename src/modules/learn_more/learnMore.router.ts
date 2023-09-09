import { Router } from "express";
import * as LearnMoreService from './learnMore.service';
import * as LearnMoreValidators from '~/validators/learn_more';
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { validateBody, validateParams } from "~/middlewares/validators/request.val";
import { ILearnMoreCreateInput, ILearnMoreIDInput, ILearnMoreUpdateInput } from "~/@types/learn_more";

const router = Router();

router.post('/',
    jwtAuth,
    validateBody<ILearnMoreCreateInput>(LearnMoreValidators.createLearnMore),
    LearnMoreService.createLearnMore
);

router.get('/:learnMore_id',
    validateParams<ILearnMoreIDInput>(LearnMoreValidators.learnMoreId),
    LearnMoreService.getLearnMoreById
);

router.put('/:learnMore_id',
    jwtAuth,
    validateParams<ILearnMoreIDInput>(LearnMoreValidators.learnMoreId),
    validateBody<ILearnMoreUpdateInput>(LearnMoreValidators.updateLearnMore),
    LearnMoreService.updateLearnMoreById
);

router.delete('/:learnMore_id',
    jwtAuth,
    validateParams<ILearnMoreIDInput>(LearnMoreValidators.learnMoreId),
    LearnMoreService.deleteLearnMoreById
);

export default router;