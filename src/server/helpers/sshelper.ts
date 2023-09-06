import { createServerSideHelpers } from "@trpc/react-query/server";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";

export const generateSSHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson, // optional - adds superjson serialization
  });
