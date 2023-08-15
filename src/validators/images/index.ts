import { z } from 'zod';

const imageId = z.object({
    id: z.string().uuid()
});

export {
    imageId
}