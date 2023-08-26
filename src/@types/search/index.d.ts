import { sea, searchPlaceQueryrchPlaceQuery } from "~/validators/search";
import { z } from 'zod';

type ISearchQueryInput = z.infer<typeof searchPlaceQuery>;

export {
    ISearchQueryInput
}