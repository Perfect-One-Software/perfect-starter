import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrisma> | undefined;
};

const createPrisma = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
