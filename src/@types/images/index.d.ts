import { z } from 'zod';
import { imageId } from '~/validators/images';

type IImageID = z.infer<typeof imageId>;

export {
    IImageID,
}