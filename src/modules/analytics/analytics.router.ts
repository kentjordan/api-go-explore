import { Router } from "express";
import * as AnalyticsService from "./analytics.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";

const router = Router();

// ** /analytics/places/most-rated?category=...&limit=n
router.get('/places/most-visited',
    jwtAuth,
    AnalyticsService.getOverallMostVisitedPlace
);

export default router;