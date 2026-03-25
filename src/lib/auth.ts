import {betterAuth} from 'better-auth'
import {tanstackStartCookies} from 'better-auth/tanstack-start'
import {prisma} from "#/db.ts";
import {prismaAdapter} from "@better-auth/prisma-adapter";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    // socialProviders: {
    //     google: {
    //         clientId: "YOUR_GOOGLE_CLIENT_ID",
    //         clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
    //         mapProfileToUser: (profile) => {
    //             return {
    //                 firstName: profile.given_name,
    //                 lastName: profile.family_name,
    //             };
    //         },
    //     },
    // },
    user: {
        additionalFields: {
            role: {
                type: ["student", "agent"],
                required: true,
                defaultValue: "student"
            },
        },
    },
    plugins: [tanstackStartCookies()],
    database: prismaAdapter(prisma, {provider: "postgresql"})
});
