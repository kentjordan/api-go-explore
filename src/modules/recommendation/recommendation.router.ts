import { Router } from 'express';
import { jwtAuth } from '~/middlewares/auth/jwtAuth';
import * as RecommendationServices from './recommendation.service';

const router = Router();

router.get('/public',
    RecommendationServices.getPublicRecommendationPlaces
);

router.get('/user/preferences',
    jwtAuth,
    RecommendationServices.getUserRecommendationByPreferences
);

router.get('/user/history',
    jwtAuth,
    RecommendationServices.getUserRecommendationByHistory
);


export default router;