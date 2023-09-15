import { Router } from "express";
import * as WhereToSTayServices from './whereToStay.service';

const router = Router();

router.get('/', WhereToSTayServices.getWhereToStay);

export default router;