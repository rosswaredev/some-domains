import { ArrowRight, ChevronRight, Loader2 } from "lucide-react";
import { type NextPage } from "next";
import { ChangeEvent, useState } from "react";

import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import { H3 } from "~/components/ui/h3";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { api } from "~/utils/api";

const MIN_IDEA_LENGTH = 25;

const Home: NextPage = () => {
  const suggestions = api.suggestions.list.useMutation();
  const [ideasInputText, setIdeaInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangeIdeaText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage(null);
    setIdeaInputText(event.target.value);
  };

  const handleGetDomains = async () => {
    if (ideasInputText.length < MIN_IDEA_LENGTH) {
      setErrorMessage(`Please tell me a little more`);
      return;
    }

    await suggestions.mutateAsync(ideasInputText);
  };

  const isButtonDisabled = suggestions.isLoading;
  const isIdeasInputDisabled = suggestions.isLoading || !!suggestions.data;

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
            />
            {errorMessage ? (
              <div>
                <p className="text-red-500">{errorMessage}</p>
              </div>
            ) : null}
            <Button onClick={handleGetDomains} disabled={isButtonDisabled}>
              Get Some Domains
              {suggestions.isLoading ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
            {suggestions.data && !suggestions.isLoading ? (
              <div className="animate-fade-in rounded-md border px-3">
                {suggestions.data.map((suggestion, index) => (
                  <div key={suggestion}>
                    <div className="my-3 flex justify-between">
                      <p className="">{suggestion}</p>
                      <ChevronRight />
                    </div>
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
