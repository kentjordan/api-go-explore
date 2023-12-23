import { IUserRecommendationByItsHistory } from "~/models/recommendation/user/getUserRecommendationByHistory";
import { createTransport } from 'nodemailer'
import mostRatedByHistory from "./models/mostRatedByHistory";

const getHTMLMostVisited = (data: Array<any>) => {

    let html: string = '';

    data.forEach((e, i) => {
        const title = `<h3>${e.title}</h3>`;
        const description = `<p>${e.description}</p>`;
        const visitedCount = `<p><b>Total visits: </b>${e.visited_count}</p>`;
        // const photos = `<h1>${e.title}</h1>`;
        const link = `<p>https://goexplorebatangas.com/explore_cardcontent.php?id=${e.id}</p>`;

        html += `${title}${visitedCount}${description}${link}<hr />`;

    });

    return html
}


const getHTMLMostRated = (data: Array<any>) => {

    let html: string = '';

    data.forEach((e, i) => {
        const title = `<h3>${e.title}</h3>`;
        const description = `<p>${e.description}</p>`;
        const avgRating = `<p><b>Average Rating: </b>${e.avg_rating}</p>`;
        // const photos = `<h1>${e.title}</h1>`;
        const link = `<p>https://goexplorebatangas.com/explore_cardcontent.php?id=${e.id}</p>`;

        html += `${title}${avgRating}${description}${link}<hr />`;

    });

    return html
}


export default class NewsletterService {

    private transport;

    constructor() {
        this.transport = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    getTransport() {
        return this.transport;
    }

    async sendNewsletter(users: Array<{ user_id: string, user_email: string }>) {

        users.forEach(async (user, i) => {

            // Most Visited based on user history
            const modelMostVisitedByHistory = await mostVisitedByHistory(user.user_id);
            // Most rated based on user history
            const modelMostRatedByHistory = await mostRatedByHistory(user.user_id);

            const htmlMostVisitedByHistory = `<h1>Most Visited</h1>${getHTMLMostVisited(modelMostVisitedByHistory)}`;
            const htmlMostRatedByHistory = `<h1>Most Rated</h1>${getHTMLMostRated(modelMostRatedByHistory)}`;

            let html;

            if (mostRatedByHistory.length > 0 && mostVisitedByHistory.length > 0) {

                html = `${htmlMostVisitedByHistory}${htmlMostRatedByHistory}`

                this.transport.sendMail({
                    from: {
                        name: "GoExplore Batangas",
                        address: process.env.EMAIL_USER
                    },
                    to: user.user_email,
                    subject: "Recommendation",
                    html,
                }, (err, info) => {
                    if (err !== null) {
                        console.log(err, info);
                    }
                });
            }

            if (mostRatedByHistory.length > 0 && mostVisitedByHistory.length <= 0) {

                html = `${htmlMostRatedByHistory}`

                this.transport.sendMail({
                    from: {
                        name: "GoExplore Batangas",
                        address: process.env.EMAIL_USER
                    },
                    to: user.user_email,
                    subject: "Recommendation",
                    html,
                }, (err, info) => {
                    if (err !== null) {
                        console.log(err, info);
                    }
                });

            }

            if (mostRatedByHistory.length <= 0 && mostVisitedByHistory.length > 0) {

                html = `${mostVisitedByHistory}`

                this.transport.sendMail({
                    from: {
                        name: "GoExplore Batangas",
                        address: process.env.EMAIL_USER
                    },
                    to: user.user_email,
                    subject: "Recommendation",
                    html,
                }, (err, info) => {
                    if (err !== null) {
                        console.log(err, info);
                    }
                });

            }

        });

    }


}
