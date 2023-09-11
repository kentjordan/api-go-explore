import { z } from 'zod';

const loveOurPlanetId = z.object({
    loveOurPlanet_id: z.string().uuid()
}).strict();

const createLoveOurPlanet = z.object({
    title: z.string().min(1)
}).strict();

const updateLoveOurPlanet = z.object({
    title: z.string().min(1).optional()
}).strict();

export {
    loveOurPlanetId,
    createLoveOurPlanet,
    updateLoveOurPlanet
}