import { createTransport } from 'nodemailer'
import { mostVisitedPlacesByHistory } from '~/models/recommendation/user/byHistory/mostVisitedPlaces';
import { mostRatedPlacesByHistory } from '~/models/recommendation/user/byHistory/mostRatedPlaces';
import { mostRatedPlacesByPreferences } from '~/models/recommendation/user/byPreferences/mostRatedPlaces';

const getEmailHTML = (mostRated: Array<any>, mostVisited: Array<any>, suggested: Array<any>) => {

    return `
        <h1>GOOD DAY!</h1>
        <p>Greetings from Go Explore Batangas! We hope this newsletter finds you well and filled with wanderlust. We're
            thrilled to
            bring you an exclusive invitation to explore the enchanting destination of Batangas, where every corner tells a
            story,
            and every experience is a journey.</p>
        <h3>MOST RATED</h3>
        <ol>
            ${mostRated.length <= 0 ? "N/A" : mostRated.map((e, i) => `<li>${e.title}</li>`).join("")}
        </ol>
        <h3>MOST VISITED</h3>
        <ol>
            ${mostVisited.length <= 0 ? "N/A" : mostVisited.map((e, i) => `<li>${e.title}</li>`).join("")}
        </ol>
        <h3>SUGGESTED</h3>
        <ol>
            ${suggested.length <= 0 ? "N/A" : suggested.map((e, i) => `<li>${e.title}</li>`).join("")}
        </ol>
        <p>Ready to embark on an unforgettable journey? Visit our website GO EXPLORE (goexplorebatangas.com) to plan your
            trip,
            explore detailed itineraries, and make the most of your time in [Destination].</p>
        <p>Don't miss out on the magic that awaits you in Batangas. Pack your bags and get ready for a travel experience
            like never
            before!</p>
        <p>Happy Travels,</p>
        <p>The Go Explore Batangas Team</p>
    `

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

            // Most VISITED based on user HISTORY
            const modelMostVisitedByHistory = await mostVisitedPlacesByHistory(user.user_id, 10);

            // Most RATED based on user HISTORY
            const modelMostRatedByHistory = await mostRatedPlacesByHistory(user.user_id, 10);

            // Most RATED based on user PREFERENCES
            const modelMostRatedByPrefences = await mostRatedPlacesByPreferences(user.user_id, 5);

            const html = getEmailHTML(modelMostRatedByHistory, modelMostVisitedByHistory, modelMostRatedByPrefences)

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

        });

    }

}


