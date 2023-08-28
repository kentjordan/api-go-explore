import { z } from 'zod';
import { createPlace, placeId, updatePlace, placeCategory } from "~/validators/places";

type IPlaceID = z.infer<typeof placeId>;
type IPlaceCreateInput = z.infer<typeof createPlace>;
type IPlaceUpdateInput = z.infer<typeof updatePlace>;
type IPlaceCategory = z.infer<typeof placeCategory>;

export {
    IPlaceID,
    IPlaceCreateInput,
    IPlaceUpdateInput,
    IPlaceCategory
}