import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAvailableDomains } from "~/utils/getAvailableDomains";

const getSuggestedDomainsFromIdea = async (idea: string) => {
  return ["google.com", "rossware.dev"];
};

export const suggestionsRouter = createTRPCRouter({
  list: publicProcedure
    .input(z.string())
    .output(z.array(z.string()))
    .mutation(async ({ input }) => {
      const rawSuggestedDomains = await getSuggestedDomainsFromIdea(input);

      return await getAvailableDomains(rawSuggestedDomains);
    }),
});
