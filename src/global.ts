import { PrismaClient } from '@prisma/client';
import path from 'path'

global.prismaClient = new PrismaClient();

global.uploadedFilesPath = {
    images: path.join(process.cwd(), '/uploaded_files/images'),
    others: path.join(process.cwd(), '/uploaded_files/others')
}

if (process.env.NODE_ENV.trim() === 'production') {

    global.api = {
        url: `https://${process.env.API_HOST}`,
    }

    global.frontend = {
        // Your frontend domain here
        urls: '*'
    }

}

if (process.env.NODE_ENV.trim() === 'development') {

    global.api = {
        url: `https://${process.env.API_HOST}:${process.env.API_PORT}`
    }

    global.frontend = {
        urls: '*'
    }

}
