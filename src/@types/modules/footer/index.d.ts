import { z } from 'zod';
import { createFooter, updateFooter, footerId } from '~/validators/footer';

type IFooterIDInput = z.infer<typeof footerId>;
type IFooterCreateInput = z.infer<typeof createFooter>;
type IFooterUpdateInput = z.infer<typeof updateFooter>;

export {
    IFooterCreateInput,
    IFooterUpdateInput,
    IFooterIDInput
}