import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const suggestionsRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.string())
    .output(z.array(z.string()))
    .mutation(({ input }) => {
      return ["one", "two", "three"];
    }),
});
