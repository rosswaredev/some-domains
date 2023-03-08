import { type NextPage } from "next";

import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import { H2 } from "~/components/ui/h2";
import { H3 } from "~/components/ui/h3";
import { Textarea } from "~/components/ui/textarea";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-lg px-6">
        <header className="mb-8 p-4 text-center">
          <H3>Enter your idea and get some domains</H3>
        </header>
        <main>
          <div className="grid w-full gap-2">
            <Textarea placeholder="I wanna build and app that..." />
            <Button>Get Some Domains</Button>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
