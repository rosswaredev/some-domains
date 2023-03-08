import whoiser, { WhoisSearchResult } from "whoiser";

const firstResult = (whoisResults: Awaited<ReturnType<typeof whoiser>>) => {
  const whoisServers = Object.keys(whoisResults);

  if (whoisServers[0]) {
    const result = whoisResults[whoisServers[0]];
    if (result) return result;
  }

  return null;
};

const firstLineText = (
  whoisResult: string | Array<string> | WhoisSearchResult | null
) => {
  if (
    whoisResult &&
    typeof whoisResult === "object" &&
    "text" in whoisResult &&
    Array.isArray(whoisResult.text) &&
    whoisResult.text[0]
  )
    return whoisResult.text[0].toLocaleLowerCase();

  return "";
};

const getDomainAvailability = async (domain: string): Promise<boolean> => {
  const domainWhois = await whoiser(domain, { follow: 1 });
  const firstDomainWhois = firstResult(domainWhois);
  const firstTextLine = firstLineText(firstDomainWhois);

  return firstTextLine.includes(`domain not found`);
};

export const getAvailableDomains = async (domains: string[]) => {
  const domainAvailabilityResults = await Promise.all(
    domains.map((domain) => getDomainAvailability(domain))
  );
  return domains.filter((_, index) => domainAvailabilityResults[index]);
};
