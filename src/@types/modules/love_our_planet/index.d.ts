import { z } from 'zod';
import { createLoveOurPlanet, loveOurPlanetId, updateLoveOurPlanet } from '~/validators/love_our_planet';

type ILoveOurPlanetCreateInput = z.infer<typeof createLoveOurPlanet>;
type ILoveOurPlanetUpdateInput = z.infer<typeof updateLoveOurPlanet>;
type ILoveOurPlanetIDInput = z.infer<typeof loveOurPlanetId>;

export {
    ILoveOurPlanetCreateInput,
    ILoveOurPlanetUpdateInput,
    ILoveOurPlanetIDInput
}