import { type NextPage } from "next";

import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import { H2 } from "~/components/ui/h2";
import { Textarea } from "~/components/ui/textarea";

const Home: NextPage = () => {
  return (
    <Layout>
      <header>
        <H2>Enter your idea and get some domains</H2>
      </header>
      <main>
        <div className="grid w-full gap-2">
          <Textarea placeholder="Type your message here." />
          <Button>Get Some Domains</Button>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
