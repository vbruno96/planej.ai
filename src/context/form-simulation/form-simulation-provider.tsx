import {
  FormSimulationContext,
  type AnswerData,
  type GoalData,
} from "@/context/form-simulation/form-simulation-context";
import { simulationFormSteps } from "@/data/simulation";
import { useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

export function ForSimulationProvider({ children }: PropsWithChildren) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answerData, setAnswerData] = useState({} as AnswerData);

  const totalSteps = simulationFormSteps.length;
  const navigate = useNavigate();

  function handleNextStep(value: string) {
    const answer = {
      ...answerData,
      [simulationFormSteps[currentStepIndex].id]: value,
    };
    setAnswerData(answer);

    if (currentStepIndex + 1 > totalSteps - 1) {
      const id = saveFormData(answer);
      navigate(`/resultado/${id}`);
      return;
    }

    setCurrentStepIndex((prevState) => prevState + 1);
  }

  function saveFormData(data: AnswerData): string {
    const goalId = crypto.randomUUID();

    const toStore = {
      ...data,
      id: goalId,
      createdAt: new Date().toISOString(),
    };
    const storage = localStorage.getItem("goals");
    const goalStored = storage ? (JSON.parse(storage) as GoalData[]) : [];

    localStorage.setItem("goals", JSON.stringify([...goalStored, toStore]));
    return goalId;
  }

  function handlePrevStep() {
    if (currentStepIndex === 0) {
      return;
    }

    setCurrentStepIndex((prevState) => prevState - 1);
  }

  function isFirstStep() {
    return simulationFormSteps[0] === simulationFormSteps[currentStepIndex];
  }

  return (
    <FormSimulationContext.Provider
      value={{
        answerData,
        currentStepIndex,
        handleNextStep,
        handlePrevStep,
        isFirstStep,
        totalSteps,
      }}
    >
      {children}
    </FormSimulationContext.Provider>
  );
}
