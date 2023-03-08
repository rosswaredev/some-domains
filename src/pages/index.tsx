import { type NextPage } from "next";
import { IdeaInput } from "~/components/idea-input";

import { Layout } from "~/components/layout";
import { SuggestionsList } from "~/components/suggestions-list";
import { Alert } from "~/components/ui/Alert";
import { H3 } from "~/components/ui/h3";
import { Separator } from "~/components/ui/separator";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const suggestions = api.suggestions.list.useMutation();

  const handleGetDomains = (idea: string) => {
    void suggestions.mutateAsync(idea);
  };

  return (
    <Layout>
      <Separator />
      <main className="mx-auto max-w-lg px-6">
        <div className="grid w-full gap-3">
          <H3>Describe your idea</H3>
          <IdeaInput
            isLoading={suggestions.isLoading}
            disabled={suggestions.isLoading}
            onSubmit={handleGetDomains}
          />
          {suggestions.data && !suggestions.isLoading ? (
            <SuggestionsList suggestions={suggestions.data} />
          ) : null}
          {suggestions.error ? (
            <Alert.Error>Something went wrong :(</Alert.Error>
          ) : null}
          {suggestions.data && suggestions.data.length === 0 ? (
            <Alert.Warning>Please rethink that idea</Alert.Warning>
          ) : null}
        </div>
      </main>
    </Layout>
  );
};

export default Home;
