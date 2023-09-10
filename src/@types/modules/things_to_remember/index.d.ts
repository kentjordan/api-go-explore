import { z } from 'zod';
import {
    createThingToRemember,
    updateThingToRemember,
    thingToRememberId
} from '~/validators/things_to_remember';

type IThingToRememberIDInput = z.infer<typeof thingToRememberId>;
type IThingToRememberCreateInput = z.infer<typeof createThingToRemember>;
type IThingToRememberUpdateInput = z.infer<typeof updateThingToRemember>;

export {
    IThingToRememberIDInput,
    IThingToRememberCreateInput,
    IThingToRememberUpdateInput
}