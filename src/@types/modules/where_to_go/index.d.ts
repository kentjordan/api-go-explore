import { z } from 'zod';
import { createWhereToGo, updateWhereToGo, whereToGoId } from '~/validators/where_to_go';

type IWhereToGoIDInput = z.infer<typeof whereToGoId>;
type IWhereToGoCreateInput = z.infer<typeof createWhereToGo>;
type IWhereToGoUpdateInput = z.infer<typeof updateWhereToGo>;

export {
    IWhereToGoIDInput,
    IWhereToGoCreateInput,
    IWhereToGoUpdateInput
}