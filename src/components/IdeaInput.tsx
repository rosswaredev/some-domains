import { reportUnusedDisableDirectives } from "@/.eslintrc.cjs";
import { ArrowRight, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { getRandomPlaceholder } from "~/utils/getRandomIdeaPlaceholder";
import { Button, ButtonProps } from "./ui/button";
import { Textarea } from "./ui/textarea";

const MIN_IDEA_LENGTH = 25;

type IdeaInputProps = {
  isLoading?: boolean;
  onSubmit: (idea: string) => void;
} & Pick<ButtonProps, "disabled">;
export const IdeaInput = ({
  disabled,
  isLoading,
  onSubmit,
}: IdeaInputProps) => {
  const [ideaPlaceholder, setIdeaPlaceholder] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [ideasInputText, setIdeaInputText] = useState("");

  useEffect(() => {
    setIdeaPlaceholder(getRandomPlaceholder(ideaPlaceholder));
  }, []);

  const handleChangeIdeaText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage(null);
    setIdeaInputText(event.target.value);
  };

  const handleSubmit = () => {
    // If the user hasn't typed anything, use the placeholder
    if (ideasInputText.length === 0) {
      setIdeaInputText(ideaPlaceholder);
      onSubmit(ideaPlaceholder);
      return;
    }

    if (ideasInputText.length < MIN_IDEA_LENGTH) {
      setErrorMessage(`Please tell me a little more`);
      return;
    }

    onSubmit(ideasInputText);
  };

  return (
    <>
      <Textarea
        placeholder={ideaPlaceholder}
        value={ideasInputText}
        onChange={handleChangeIdeaText}
      />
      {errorMessage ? (
        <div>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      ) : null}
      <Button onClick={handleSubmit} disabled={disabled}>
        Get Some Domains
        {isLoading ? (
          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
        ) : (
          <ArrowRight className="ml-2 h-4 w-4" />
        )}
      </Button>
    </>
  );
};
