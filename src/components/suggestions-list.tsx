import { ChevronRight } from "lucide-react";
import { List } from "./ui/list";
import { Separator } from "./ui/separator";

export const SuggestionsList = ({ suggestions }: { suggestions: string[] }) => {
  return (
    <List>
      {suggestions.map((suggestion, index) => (
        <>
          <List.Item
            href={`https://porkbun.com/checkout/search?q=${suggestion}`}
          >
            {suggestion}
            <ChevronRight />
          </List.Item>
          {index < suggestions.length - 1 ? <Separator /> : null}
        </>
      ))}
    </List>
  );
};
