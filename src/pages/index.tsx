import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { ChangeEvent, PropsWithChildren, useEffect, useState } from "react";
import { IdeaInput } from "~/components/IdeaInput";

import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import { H3 } from "~/components/ui/h3";
import { List } from "~/components/ui/list";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";
import { getRandomPlaceholder } from "~/utils/getRandomIdeaPlaceholder";

const Home: NextPage = () => {
  const suggestions = api.suggestions.list.useMutation();

  const handleGetDomains = async (idea: string) => {
    await suggestions.mutateAsync(idea);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-lg px-6">
        <header className="mb-8 p-4 text-center">
          <H3>Enter your idea and get some domains</H3>
        </header>
        <main>
          <div className="grid w-full gap-2">
            <IdeaInput
              disabled={suggestions.isLoading}
              onSubmit={handleGetDomains}
            />
            {suggestions.data && !suggestions.isLoading ? (
              <List>
                {suggestions.data.map((suggestion, index) => (
                  <>
                    <List.Item
                      href={`https://porkbun.com/checkout/search?q=${suggestion}`}
                    >
                      {suggestion}
                      <ChevronRight />
                    </List.Item>
                    {index < suggestions.data.length - 1 ? <Separator /> : null}
                  </>
                ))}
              </List>
            ) : null}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
