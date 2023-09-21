import { PrismaClient } from '@prisma/client';
import path from 'path'

global.prismaClient = new PrismaClient();

global.uploadedFilesPath = {
    images: path.join(process.cwd(), '/uploaded_files/public/images'),
    others: path.join(process.cwd(), '/uploaded_files/public/others')
}

if (process.env.NODE_ENV.trim() === 'production') {

    global.api = {
        http_url: `http://${process.env.API_HOST}`,
        https_url: `https://${process.env.API_HOST}`
    }

    global.frontend = {
        // Your frontend domain here
        urls: '*'
    }

}

if (process.env.NODE_ENV.trim() === 'development') {

    global.api = {
        http_url: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
        https_url: `https://${process.env.API_HOST}:${process.env.API_PORT}`
    }

    global.frontend = {
        urls: '*'
    }

}
