import type { simulationFormSteps } from "@/data/simulation";
import type { InsightData } from "@/services/aiService";
import { createContext } from "react";

export type AnswerData = Record<
  (typeof simulationFormSteps)[number]["id"],
  string
>;
export type GoalData = AnswerData & {
  id: string;
  insight?: InsightData;
  createdAt: string;
};

interface FormSimulationContextValue {
  currentStepIndex: number;
  handleNextStep: (value: string) => void;
  handlePrevStep: () => void;
  isFirstStep: () => boolean;
  totalSteps: number;
  answerData: AnswerData;
}

export const FormSimulationContext = createContext<
  FormSimulationContextValue | undefined
>(undefined);
