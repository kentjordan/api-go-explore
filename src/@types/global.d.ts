import { PrismaClient } from '@prisma/client'

interface UploadedFilesPath {
    images: string,
    others: string,
}

export declare global {
    var prismaClient: PrismaClient;
    var uploadedFilesPath: UploadedFilesPath;
    var frontend: {
        protocol?: 'http' | 'https';
        url: string;
    }
    var api: {
        protocol?: 'http' | 'https';
        url?: string;
    }

    namespace Express {
        interface User {
            id: string;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            API_HOST: string;
            API_PORT: string;
            DB_NAME: string;
            DB_HOSTNAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DATABASE_URL: string;
            SECRET_KEY: string;
            NODE_ENV: 'production' | 'development';
        }
    }
}