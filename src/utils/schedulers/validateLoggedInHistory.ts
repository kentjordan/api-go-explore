import cron from 'node-cron';
import CronTime from 'cron-time-generator';
import { isTokenExpired } from '~/utils/jwt.util';

const validateLoggedInHistory = async () => {

    // Delete expired refresh_token everyday at 12:00AM
    cron.schedule(CronTime.everyDay(), async () => {
        try {

            const loggedInHistory = await prismaClient.loggedInHistory.findMany({
                select: {
                    id: true,
                    user_id: true,
                    refresh_token: true
                }
            });

            loggedInHistory.forEach(async (e, i) => {
                if (await isTokenExpired(e.refresh_token as string)) { // DELETE logged in info
                    await prismaClient.loggedInHistory.delete({
                        where: {
                            id: e.id,
                            refresh_token: e.refresh_token,
                        }
                    });
                }
            });

        } catch (error) {
            console.log(error);
        }
    });


}

export default validateLoggedInHistory;