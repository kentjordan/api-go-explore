import { z } from 'zod';

const processEnv = z.object({
    API_HOST: z.string(),
    API_PORT: z.string(),
    DB_NAME: z.string(),
    DB_HOSTNAME: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
    SECRET_KEY: z.string(),
    NODE_ENV: z.enum(['production', 'development']),
});

export {
    processEnv
}