import { ArrowRight, Loader2 } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { getRandomPlaceholder } from "~/utils/getRandomIdeaPlaceholder";
import { Alert } from "./ui/Alert";
import { Button, type ButtonProps } from "./ui/button";
import { Textarea } from "./ui/textarea";

const MAX_IDEA_LENGTH = 200;
const MIN_WORD_LENGTH = 3;

const wordCount = (text: string) => text.split(" ").length;

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
    if (event.target.value.length > MAX_IDEA_LENGTH) {
      setErrorMessage(`Enter less than ${MAX_IDEA_LENGTH} characters.`);
      return;
    }

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

    if (wordCount(ideasInputText) < MIN_WORD_LENGTH) {
      setErrorMessage(`Enter at least 3 words.`);
      return;
    }

    onSubmit(ideasInputText);
  };

  const isButtonDisabled = disabled || !!errorMessage || isLoading;

  return (
    <>
      <Textarea
        placeholder={ideaPlaceholder}
        value={ideasInputText}
        onChange={handleChangeIdeaText}
      />
      {errorMessage ? <Alert.Warning>{errorMessage}</Alert.Warning> : null}
      <Button onClick={handleSubmit} disabled={isButtonDisabled}>
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
