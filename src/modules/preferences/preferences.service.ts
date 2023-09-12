import { NextFunction, Request, Response } from "express"
import { IPreferencesCreateInput, IPreferencesIDInput, IPreferencesUpdateInput } from "~/@types/modules/preferences";
import { IRequestCustomBody, IRequestCustomParams } from "~/@types/request";
import * as PreferencesModels from '~/models/preferences';
import { ExtractReqBody, ExtractReqParams, ExtractReqUser } from "~/utils/request.util";

const createPreferences = async (req: IRequestCustomBody<IPreferencesCreateInput>, res: Response, next: NextFunction) => {

    const input = ExtractReqBody<IPreferencesCreateInput>(req);
    const { id: user_id } = ExtractReqUser(req);

    const createdPreferences = await PreferencesModels.createPreferences({ ...input, user_id }, next);

    if (createdPreferences?.isLimitExceeded) {
        res.status(400).json({
            ...createdPreferences,
            message: 'Can\'t create more than 1 preferences.',
            type: 'LIMIT_EXCEEDED',
        });
        return;
    }

    if (createdPreferences) {
        res.status(200).json({
            ...createdPreferences
        });
    }

}

// Get preferenced categories by logged in USER ID
const getPreferencesByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const { id: user_id } = ExtractReqUser(req);

    const userPreferenced = await PreferencesModels.getPreferencesByUserId(user_id, next);

    if (userPreferenced) {
        res.status(200).json({
            ...userPreferenced
        });
    }

}

// Update preferenced categories by logged in USER ID and preferenced id
const updatePreferencesByUserId = async (req: IRequestCustomParams<IPreferencesIDInput>, res: Response, next: NextFunction) => {

    const { preferences_id } = ExtractReqParams<IPreferencesIDInput>(req);
    const { id: user_id } = ExtractReqUser(req);
    const input = ExtractReqBody<IPreferencesUpdateInput>(req);

    const updatedPreferences = await PreferencesModels.updatePreferencesByUserId({
        ...input,
        preferences_id,
        user_id
    }, next);

    if (updatedPreferences) {
        res.status(200).json({
            ...updatedPreferences
        });
    }

}

const deletePreferencesByUserId = async (req: IRequestCustomParams<IPreferencesIDInput>, res: Response, next: NextFunction) => {
    const { preferences_id } = ExtractReqParams<IPreferencesIDInput>(req);

    const deletedPreferences = await PreferencesModels.deletePreferencesByUserId(preferences_id, next);

    if (deletedPreferences) {
        res.status(200).json({
            ...deletedPreferences
        });
    }

}

export {
    createPreferences,
    getPreferencesByUserId,
    updatePreferencesByUserId,
    deletePreferencesByUserId
}