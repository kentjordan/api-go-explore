import { z } from 'zod';
import { processEnv } from '~/validators/env'
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
        urls: Array<string> | string;
    }
    var api: {
        protocol?: 'http' | 'https';
        http_url?: string;
        https_url?: string;
    }

    namespace Express {
        interface User {
            id: string;
        }
    }

    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof processEnv> { }
    }
}