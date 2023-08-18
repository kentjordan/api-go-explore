import { z } from 'zod';
import { eventId, createEvent, updateEvent } from '~/validators/events';

type IEventID = z.infer<typeof eventId>;
type IEventCreateInput = z.infer<typeof createEvent>;
type IEventUpdateInput = z.infer<typeof updateEvent>;

export {
    IEventID,
    IEventCreateInput,
    IEventUpdateInput
}
