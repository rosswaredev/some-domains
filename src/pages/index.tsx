import { type NextPage } from "next";
import { IdeaInput } from "~/components/IdeaInput";

import { Layout } from "~/components/layout";
import { SuggestionsList } from "~/components/suggestions-list";
import { Alert } from "~/components/ui/Alert";
import { H3 } from "~/components/ui/h3";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const suggestions = api.suggestions.list.useMutation();

  const handleGetDomains = (idea: string) => {
    void suggestions.mutateAsync(idea);
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
      </div>
    </Layout>
  );
};

export default Home;
