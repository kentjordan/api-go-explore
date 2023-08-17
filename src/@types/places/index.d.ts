import { z } from 'zod';
import { createPlace, placeId, updatePlace } from "~/validators/places";

type IPlaceID = z.infer<typeof placeId>;
type IPlaceCreateInput = z.infer<typeof createPlace>;
type IPlaceUpdateInput = z.infer<typeof updatePlace>;

export {
    IPlaceID,
    IPlaceCreateInput,
    IPlaceUpdateInput
}