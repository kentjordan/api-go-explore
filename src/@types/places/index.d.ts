import { z } from 'zod';
import { createPlace } from "~/validators/places";

type IPlaceCreateInput = z.infer<typeof createPlace>;

export {
    IPlaceCreateInput
}