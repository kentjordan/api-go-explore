import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { createUserFeedbackById } from "~/validators/feedbacks";

interface IFeedbackService {
    async getFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
    async updateFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
    async deleteFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface IUserFeedbackService {
    async createUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
    async getUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
    async updateUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>
    async deleteUserFeedbackById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

interface IPlaceFeedbackService {
    async getPlaceFeedbacksById(req: Request, res: Response, next: NextFunction): Promise<void>;
}

type IUserFeedbackByIdCreateInput = z.infer<typeof createUserFeedbackById>;

export {
    IFeedbackService,
    IUserFeedbackService,
    IPlaceFeedbackService,
    IUserFeedbackByIdCreateInput
}