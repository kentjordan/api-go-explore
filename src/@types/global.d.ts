import { PrismaClient } from '@prisma/client'

interface UploadedFilesPath {
    images: string,
    others: string,
}

export declare global {
    var prismaClient: PrismaClient;
    var uploadedFilesPath: UploadedFilesPath;
}