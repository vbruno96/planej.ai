import type { simulationFormSteps } from "@/data/simulation";
import { createContext } from "react";

export type AnswerData = Record<
  (typeof simulationFormSteps)[number]["id"],
  string
>;
export type GoalData = Record<string, AnswerData>;

interface FormSimulationContextValue {
  currentStepIndex: number;
  handleNextStep: (value: string) => void;
  handlePrevStep: () => void;
  isFirstStep: () => boolean;
  totalSteps: number;
  goalData: GoalData[] | [];
  answerData: AnswerData;
}

export const FormSimulationContext = createContext<
  FormSimulationContextValue | undefined
>(undefined);
