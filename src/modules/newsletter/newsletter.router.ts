import { NextFunction, Request, Response, Router } from "express";
import NewsletterService from "./newsletter.service";
import { jwtAuth } from "~/middlewares/auth/jwtAuth";
import { ExtractReqBody } from "~/utils/request.util";
import { ICreateNewsLetterDto, createNewsletterSchema } from "./dto/create-newsletter.dto";
import { validateBody } from "~/middlewares/validators/request.val";

const newsletterService = new NewsletterService();
const router = Router();

router.post('/', jwtAuth,
    validateBody(createNewsletterSchema),
    async (req: Request, res: Response, next: NextFunction) => {

        const { users } = ExtractReqBody<ICreateNewsLetterDto>(req);

        try {
            await newsletterService.sendNewsletter(users);
            res.status(200).json({
                message: "Newsletters has been successfully sent."
            });
        } catch (error) {
            next(error);
        }

    });

export default router;