import { z } from 'zod';
import {
    createThingToAvoid,
    updateThingToAvoid,
    thingToAvoidId
} from '~/validators/things_to_avoid';

type IThingToAvoidIDInput = z.infer<typeof thingToAvoidId>;
type IThingToAvoidCreateInput = z.infer<typeof createThingToAvoid>;
type IThingToAvoidUpdateInput = z.infer<typeof updateThingToAvoid>;

export {
    IThingToAvoidIDInput,
    IThingToAvoidCreateInput,
    IThingToAvoidUpdateInput
}