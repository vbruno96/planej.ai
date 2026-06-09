import type { simulationFormSteps } from "@/data/simulation";
import type { InsightData } from "@/services/aiService";
import { createContext } from "react";

export type StepData = Record<
  (typeof simulationFormSteps)[number]["id"],
  string
>;

export type SimulationData = StepData & {
  id: string;
  insight?: InsightData;
  chat?: {
    role: "user" | "model";
    text: string;
  }[];
  createdAt: string;
};

interface FormSimulationContextValue {
  currentStepIndex: number;
  handleNextStep: (value: string) => void;
  handlePrevStep: () => void;
  isFirstStep: () => boolean;
  totalSteps: number;
  stepData: StepData;
}

export const FormSimulationContext = createContext<
  FormSimulationContextValue | undefined
>(undefined);
