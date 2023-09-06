import { LocationSchema } from "~/server/generated";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const locationsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.location.findMany();
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: LocationSchema.shape.id,
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.location.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
