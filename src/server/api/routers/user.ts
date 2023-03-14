import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    if (ctx.session) {
      const userId = ctx.session.user.id;
      return await ctx.prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          Tasks: true,
          Reminders: true,
        },
      });
    } else {
      return null;
    }
  }),
});
