import { z } from 'zod';
import { createLearnMore, learnMoreId, updateLearnMore } from '~/validators/learn_more';

type ILearnMoreIDInput = z.infer<typeof learnMoreId>;
type ILearnMoreCreateInput = z.infer<typeof createLearnMore>;
type ILearnMoreUpdateInput = z.infer<typeof updateLearnMore>;

export {
    ILearnMoreIDInput,
    ILearnMoreCreateInput,
    ILearnMoreUpdateInput
}