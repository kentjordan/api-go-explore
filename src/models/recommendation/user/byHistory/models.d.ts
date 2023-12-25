
export type IUserRecommendationByItsHistory = Array<{
    id: string,
    title: string,
    category: string,
    photos: Array<string>,
    description: string,
    province: string,
    city: string,
    visited_count: number
}>