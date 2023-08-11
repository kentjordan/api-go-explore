import { PrismaClient } from '@prisma/client';
import path from 'path'

global.prismaClient = new PrismaClient();

global.uploadedFilesPath = {
    images: path.join(process.cwd(), '/uploaded_files/images'),
    others: path.join(process.cwd(), '/uploaded_files/others')
}