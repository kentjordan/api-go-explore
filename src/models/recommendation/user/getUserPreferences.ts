const getUserPreferences = async (user_id: string) => {
    const { preferenced_categories } = await prismaClient.preferences.findUniqueOrThrow({
        select: {
            preferenced_categories: true
        },
        where: {
            user_id
        }
    });

    return preferenced_categories;
}


export default getUserPreferences;