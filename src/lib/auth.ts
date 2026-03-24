import {betterAuth} from 'better-auth'
import {tanstackStartCookies} from 'better-auth/tanstack-start'
import {prisma} from "#/db.ts";
import {prismaAdapter} from "@better-auth/prisma-adapter";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    plugins: [tanstackStartCookies()],
    database: prismaAdapter(prisma, {provider: "postgresql"})
});
