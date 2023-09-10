import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const logsPath = (type: 'access' | 'error') => path.join(__dirname, '../../../', 'logs', type === 'access' ? 'access.log' : 'error.log');

const accessLogStream = fs.createWriteStream(logsPath('access'), {
    flags: 'a',
    encoding: 'utf-8'
});

const errorLogStream = fs.createWriteStream(logsPath('error'), {
    flags: 'a',
    encoding: 'utf-8'
});

const isOnProduction = process.env.NODE_ENV === 'production';

const accessLogger = () => {
    return morgan(isOnProduction ? 'combined' : 'dev', {
        ...(isOnProduction ? { stream: accessLogStream } : {}),
        skip: (req, res) => {
            if (res.statusCode !== undefined) {
                return res.statusCode >= 400;
            }
            return true;
        },
    });
}

const errorLogger = () => {
    return morgan(isOnProduction ? 'combined' : 'dev', {
        ...(isOnProduction ? { stream: errorLogStream } : {}),
        skip: (req, res) => {
            if (res.statusCode) {
                return res.statusCode < 400;
            }
            return false;
        },
    });
}

export {
    accessLogger,
    errorLogger
};