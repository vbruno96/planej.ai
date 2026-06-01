import { Button } from "@/components/shared/button";
import { Input, type InputProps } from "@/components/shared/input";
import { simulationFormSteps } from "@/data/simulation";
import { useFormSimulation } from "@/hooks/use-form-simulation";
import { formatCurrencyMask } from "@/utils/currency";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { useState, type SyntheticEvent } from "react";

export interface FormStepProps {
  id: string;
  icon: LucideIcon;
  title: string;
  question: string;
  inputProps: InputProps;
  submitButtonProps?: {
    label: string;
    emojiIcon?: string;
  };
}

export function FormStep({
  icon: Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
}: FormStepProps) {
  const {
    handleNextStep: onNext,
    handlePrevStep: onBack,
    isFirstStep,
    answerData,
    currentStepIndex,
  } = useFormSimulation();
  const [inputValue, setInputValue] = useState(() => {
    if (
      !Object.keys(answerData).includes(
        simulationFormSteps[currentStepIndex].id
      )
    )
      return "";

    return answerData[simulationFormSteps[currentStepIndex].id];
  });

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!inputValue) return;

    onNext(inputValue);
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0_rgba(0,0,0,.2)] sm:p-8">
      <div className="bg-primary mb-4 flex size-15 items-center justify-center rounded-xl">
        <Icon size={32} strokeWidth={1.5} className="text-primary-foreground" />
      </div>
      <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
        {title}
      </h2>
      <h3 className="text-muted-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
        {question}
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          {...inputProps}
          value={inputValue}
          onChange={(event) =>
            setInputValue(
              inputProps.prefix === "R$"
                ? formatCurrencyMask(event.target.value)
                : event.target.value
            )
          }
        />
        <div className="flex flex-col gap-4 sm:mt-6.5 sm:flex-row sm:gap-3">
          {!isFirstStep() && (
            <Button
              type="button"
              variant="ghost"
              className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
              onClick={onBack}
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Voltar
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            className="order-1 flex-1 sm:order-2"
            disabled={!inputValue}
          >
            {submitButtonProps?.label ?? "Próximo"}
            {submitButtonProps?.emojiIcon ?? (
              <ArrowRight size={16} strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
