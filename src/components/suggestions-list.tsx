import { ChevronRight } from "lucide-react";
import { List, ListItem } from "./ui/list";
import { Separator } from "./ui/separator";

export const SuggestionsList = ({ suggestions }: { suggestions: string[] }) => {
  return (
    <List>
      {suggestions.map((suggestion, index) => (
        <>
          <ListItem
            key={suggestion}
            href={`https://porkbun.com/checkout/search?q=${suggestion}`}
          >
            {suggestion}
            <ChevronRight />
          </ListItem>
          {index < suggestions.length - 1 ? <Separator /> : null}
        </>
      ))}
    </List>
  );
};
