import { z } from 'zod';
import {
    createItineraryBuilderItem,
    itinerarBuilderItemyId,
    itineraryBuilderItemUserId,
    updateItineraryBuilderItem
} from '~/validators/itinerary_builder';

type IItineraryBuilderItemId = z.infer<typeof itinerarBuilderItemyId>;
type IItineraryBuilderItemUserId = z.infer<typeof itineraryBuilderItemUserId>;
type IItineraryBuilderItemCreateInput = z.infer<typeof createItineraryBuilderItem>;
type IItineraryBuilderItemUpdateInput = z.infer<typeof updateItineraryBuilderItem>;

export {
    IItineraryBuilderItemId,
    IItineraryBuilderItemUserId,
    IItineraryBuilderItemCreateInput,
    IItineraryBuilderItemUpdateInput
}
