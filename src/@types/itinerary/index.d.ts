import { z } from 'zod';

import {
    createItineraryItem,
    itineraryId,
    itineraryUserId,
    updateItineraryItem
} from '~/validators/itinerary';

type IItineraryID = z.infer<typeof itineraryId>;
type IItineraryUserID = z.infer<typeof itineraryUserId>;
type IItineraryCreateInput = z.infer<typeof createItineraryItem>;
type IItineraryUpdateInpt = z.infer<typeof updateItineraryItem>;

export {
    IItineraryID,
    IItineraryUserID,
    IItineraryCreateInput,
    IItineraryUpdateInpt
}