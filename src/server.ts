import '~/global';
import 'dotenv/config';
import express, { json } from 'express';
import { default as usersRouter } from '~/modules/users/users.router';
import { default as placesRouter } from '~/modules/places/places.router';
import { default as imagesRouter } from '~/modules/images/images.router';
import { default as eventsRouter } from '~/modules/events/events.router';
import { default as searchRouter } from '~/modules/search/search.router';
import { default as feedbacksRouter } from '~/modules/feedbacks/feedbacks.router';
import { default as itinerariesRouter } from '~/modules/itineraries/itineraries.router';
import { default as authRouter } from '~/modules/auth/auth.router';
import error from '~/middlewares/error';

const server = express();

// Middlewares
server.use(json());

// End-points
server.use('/auth', authRouter);
server.use('/itineraries', itinerariesRouter);
server.use('/feedbacks', feedbacksRouter);
server.use('/search', searchRouter);
server.use('/places', placesRouter);
server.use('/users', usersRouter);
server.use('/images', imagesRouter);
server.use('/events', eventsRouter);

server.use(error);

server.listen(process.env.API_PORT, () => {
    console.log('Server is listening on', process.env.API_PORT);
});