import { PrismaClient } from "../generated/prisma"
import { env } from "./env";


declare global {
    var prisma: PrismaClient | undefined
}


export const prisma = global.prisma || new PrismaClient({
    log: env.nodeEnv === "development" ? ['query', 'error', 'warn'] : ['error']
});

if (env.nodeEnv !== 'production') {
    globalThis.prisma = prisma
}