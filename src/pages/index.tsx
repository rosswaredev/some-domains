import { Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { ChangeEvent, useState } from "react";

import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import { H3 } from "~/components/ui/h3";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const suggestions = api.suggestions.list.useMutation();
  const [ideasInputText, setIdeaInputText] = useState("");

  const handleChangeIdeaText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIdeaInputText(event.target.value);
  };

  const handleGetDomains = async () => {
    await suggestions.mutateAsync(ideasInputText);
  };

  const isButtonDisabled = suggestions.isLoading;
  const isIdeasInputDisabled = suggestions.isLoading || !!suggestions.data;

  const buttonText = !!suggestions.data
    ? "Regenerate Domains"
    : "Get Some Domains";

  return (
    <Layout>
      <div className="mx-auto max-w-lg px-6">
        <header className="mb-8 p-4 text-center">
          <H3>Enter your idea and get some domains</H3>
        </header>
        <main>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="I wanna build and app that..."
              value={ideasInputText}
              onChange={handleChangeIdeaText}
              disabled={isIdeasInputDisabled}
            />
            <Button onClick={handleGetDomains} disabled={isButtonDisabled}>
              {suggestions.isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                buttonText
              )}
            </Button>
            {suggestions.data && !suggestions.isLoading ? (
              <div className="rounded-md border px-3">
                {suggestions.data.map((suggestion, index) => (
                  <div>
                    <p className="my-3">{suggestion}</p>
                    {index < suggestions.data.length - 1 ? <Separator /> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
