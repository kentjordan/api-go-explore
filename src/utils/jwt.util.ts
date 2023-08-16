import { sign } from "jsonwebtoken"

const ACCESS_TOKEN_EXPIRY: string = '8h';
const REFRESH_TOKEN_EXPIRY: string = '7d';
const SECRET_KEY = process.env.SECRET_KEY;

async function generateTokens(payload: any) {

    const access_token = sign({ ...payload }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRY });
    const refresh_token = sign({ access_token }, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRY });

    return {
        access_token,
        refresh_token
    }
}

export {
    generateTokens
}