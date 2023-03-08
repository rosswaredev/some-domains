import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAvailableDomains } from "~/utils/getAvailableDomains";
import { getSuggestedDomains } from "~/utils/getSuggestedDomains";

export const suggestionsRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.string())
    .output(z.array(z.string()))
    .mutation(async ({ input }) => {
      const domainCompletions = await getSuggestedDomains(input);
      return await getAvailableDomains(domainCompletions);
    }),
});
