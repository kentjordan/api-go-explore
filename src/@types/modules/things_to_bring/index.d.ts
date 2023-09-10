import { z } from 'zod';
import {
    createThingToBring,
    updateThingToBring,
    thingToBringId
} from '~/validators/things_to_bring';

type IThingToBringIDInput = z.infer<typeof thingToBringId>;
type IThingToBringCreateInput = z.infer<typeof createThingToBring>;
type IThingToBringUpdateInput = z.infer<typeof updateThingToBring>;

export {
    IThingToBringIDInput,
    IThingToBringCreateInput,
    IThingToBringUpdateInput
}