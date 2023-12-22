(BigInt.prototype as any).toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

import 'dotenv/config';
import '~/global';
import express, { json } from 'express';
import { default as usersRouter } from '~/modules/users/users.router';
import { default as placesRouter } from '~/modules/places/places.router';
import { default as imagesRouter } from '~/modules/images/images.router';
import { default as eventsRouter } from '~/modules/events/events.router';
import { default as searchRouter } from '~/modules/search/search.router';
import { default as feedbacksRouter } from '~/modules/feedbacks/feedbacks.router';
import { default as itinerariesRouter } from '~/modules/itineraries/itineraries.router';
import { default as authRouter } from '~/modules/auth/auth.router';
import { default as visitPlaceRouter } from '~/modules/visit_place/visitPlace.router';
import { default as analyticsRouter } from "~/modules/analytics/analytics.router";
import { default as learnMoreRouter } from "~/modules/learn_more/learnMore.router";
import { default as footerRouter } from "~/modules/footer/footer.router";
import { default as thingsToBringRouter } from "~/modules/things_to_bring/thingsToBring.router";
import { default as thingsToAvoidRouter } from "~/modules/things_to_avoid/thingsToAvoid.router";
import { default as thingsToRememberRouter } from "~/modules/things_to_remember/thingsToRemember.router";
import { default as loveOurPlanetRouter } from "~/modules/love_our_planet/loveOurPlanet.router";
import { default as preferencesRouter } from "~/modules/preferences/preferences.router";
import { default as recommendationRouter } from '~/modules/recommendation/recommendation.router';
import { default as whereToGoRouter } from '~/modules/where-to-go/whereToGo.router';
import { default as whereToStayRouter } from '~/modules/where-to-stay/whereToStay.router';
import { default as itineraryBuilderRouter } from '~/modules/itinerary_builder/itineraryBuilder.router';

import error from '~/middlewares/error';
import { jwtSetup } from './middlewares/auth/jwtAuth';
import cors from 'cors';
import helmet from 'helmet';
import '~/utils/schedulers';
import { accessLogger, errorLogger } from '~/utils/logger';

const server = express();

// Middlewares
// TODO: Setup Cross-origin resource sharing
server.use(cors({
    origin: global.frontend.urls,
    credentials: true
}));

server.use(accessLogger());
server.use(errorLogger());
server.use(helmet({
    crossOriginResourcePolicy: false,
}));
server.use(json({ limit: '100mb' }));
server.use(jwtSetup.initialize());

// Static files
server.use('/public/images', express.static(uploadedFilesPath.images, {
    setHeaders(res, path, stat) {
        res.setHeader('Content-Type', 'image/png')
        res.setHeader("Content-Disposition", "inline;");
    },
}));

// End-points
server.use('/auth', authRouter);
server.use('/itineraries', itinerariesRouter);
server.use('/feedbacks', feedbacksRouter);
server.use('/search', searchRouter);
server.use('/places', placesRouter);
server.use('/users', usersRouter);
server.use('/images', imagesRouter);
server.use('/events', eventsRouter);
server.use('/visit-place', visitPlaceRouter);
server.use('/analytics', analyticsRouter);
server.use('/learn-more', learnMoreRouter);
server.use('/footer', footerRouter);
server.use('/things-to-bring', thingsToBringRouter);
server.use('/things-to-avoid', thingsToAvoidRouter);
server.use('/things-to-remember', thingsToRememberRouter);
server.use('/love-our-planet', loveOurPlanetRouter);
server.use('/preferences', preferencesRouter);
server.use('/recommendation', recommendationRouter);
server.use('/where-to-go', whereToGoRouter);
server.use('/where-to-stay', whereToStayRouter);
server.use('/itinerary-builder', itineraryBuilderRouter);

server.use(error);

server.listen(process.env.API_PORT, () => {
    console.log('*******************************');
    console.log('* Server is listening on', process.env.API_PORT, '*');
    console.log('*******************************');
    if (process.env.NODE_ENV === 'development') {
        console.log('\nLogs:\n');
    }
});