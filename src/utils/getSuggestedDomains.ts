import { OpenAIApi, Configuration } from "openai";
import { z } from "zod";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const domainsScema = z.string().url();

const parseDomainCompletions = (completionsContent: string): string[] => {
  const lines = completionsContent.split("\n");
  const sanitizedDomains = lines
    .map((line) => {
      const name = line.split(" ")[1];
      if (!name) return "";
      return name.trim().toLocaleLowerCase();
    })
    .filter((line) => line.length > 0)
    .filter((line) => domainsScema.safeParse(line).success);

  return sanitizedDomains;
};

export const getDomainCompletions = async (idea: string): Promise<string> => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content:
          "You are a brand naming expert. Given a business or product idea, you will respond only with a list 10 of domain names. Suggestions must match the core ideas presented. Use relevant top level domains. Use domain hacks sometimes.",
      },
      { role: "user", content: idea },
    ],
  });
  if (completion.data.choices.length === 0) return "";

  const completionsContent = completion.data.choices[0]?.message?.content;
  if (!completionsContent) return "";

  return completionsContent;
};

export const getSuggestedDomains = async (idea: string): Promise<string[]> => {
  const domainCompletions = await getDomainCompletions(idea);
  console.log({ domainCompletions });
  return parseDomainCompletions(domainCompletions);
};
