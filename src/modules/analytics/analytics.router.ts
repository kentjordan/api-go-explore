import { Router } from "express";
import * as AnalyticsService from "./analytics.service";

const router = Router();

// ** /analytics/places/most-rated?category=...&limit=n
router.get('/places/most-visited',
    AnalyticsService.getMostVisitedPlace
);

// ** /analytics/places/most-rated?category=...&limit=n
router.get('/places/most-rated',
    AnalyticsService.getMostRatedPlace
);

// ** /analytics/users/most-active?limit=n
router.get('/users/most-active',
    AnalyticsService.getMostActiveUsersByPlace
);

// ** /analytics/users/stats?field=...
router.get('/users/stats',
    AnalyticsService.getUsersStats
);

export default router;