import { createTRPCRouter, publicProcedure } from "../trpc";

export const locationsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.location.findMany();
  }),
});
