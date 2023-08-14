import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { IPayloadJWT } from "~/@types/auth";

const strategy = new JwtStrategy({
    secretOrKey: process.env.SECRET_KEY as string,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload: IPayloadJWT, done: VerifiedCallback) => {

    const user = { id: payload.id };

    const epochNow = Math.ceil(Date.now() / 1000);

    if (payload.exp >= epochNow) {
        done(null, user);
        return;
    }

    done(null, undefined);

    return;
});

const jwtSetup = passport.use('jwt-auth', strategy);
const jwtAuth = jwtSetup.authenticate('jwt-auth', { session: false });

export {
    jwtSetup,
    jwtAuth
}