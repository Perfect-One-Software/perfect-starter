import { createTRPCRouter, publicProcedure } from "../trpc";
import { CreatureSchema } from "~/server/generated";
import { z } from "zod";

export const creaturesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.creature.findMany();
  }),
  edit: publicProcedure
    .input(
      z.object({
        id: CreatureSchema.shape.id,
        species: CreatureSchema.shape.species.optional(),
        colorName: CreatureSchema.shape.colorName.optional(),
        image: CreatureSchema.shape.image.optional(),
        locationId: CreatureSchema.shape.locationId.optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.prisma.creature.update({
        where: { id },
        data,
      });
    }),
  create: publicProcedure
    .input(
      CreatureSchema.pick({
        image: true,
        species: true,
        colorName: true,
        locationId: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.creature.create({
        data: input,
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: CreatureSchema.shape.id,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.creature.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
