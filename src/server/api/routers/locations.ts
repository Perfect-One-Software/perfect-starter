import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { LocationSchema } from "~/server/generated";

export const locationsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.location.findMany();
  }),

  getById: publicProcedure
    .input(z.object({ locationId: LocationSchema.shape.id }))
    .query(async ({ ctx, input: { locationId } }) => {
      return await ctx.prisma.location.findUnique({ where: { id: locationId } });
    }),
});
