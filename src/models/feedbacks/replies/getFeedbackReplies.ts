type IFeedbackReplies = Array<{
    created_at: string,
    updatd_at: string,
    first_name: string,
    last_name: string,
    profile_photo: string,
    current_city: string,
    current_province: string,
    reply_comment: string,
}>

const getFeedbackReplies = async (feedback_id: string): Promise<IFeedbackReplies> => {

    return await global.prismaClient.$queryRaw`
        SELECT R.created_at, R.updated_at, U.first_name, U.last_name, U.profile_photo, U.current_city, U.current_province, R.reply_comment
        FROM "User" AS U
        INNER JOIN 
            (SELECT * FROM "ReplyComment" 
             WHERE feedback_id = ${feedback_id}::UUID) AS R
        ON U.id = R.user_id;
    `;

}

export default getFeedbackReplies;