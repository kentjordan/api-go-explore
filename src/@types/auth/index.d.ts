import { z } from 'zod';
import { login } from '~/validators/auth';

type ILoginPost = z.infer<typeof login>;

interface IPayloadJWT {
    id: string,
    exp: number,
    iat: number
}

export {
    IPayloadJWT,
    ILoginPost
}