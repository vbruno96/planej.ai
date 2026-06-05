import {
  FormSimulationContext,
  type SimulationData,
  type StepData,
} from "@/context/form-simulation/form-simulation-context";
import { simulationFormSteps } from "@/data/simulation";
import { useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

export function ForSimulationProvider({ children }: PropsWithChildren) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepData, setStepData] = useState({} as StepData);

  const totalSteps = simulationFormSteps.length;
  const navigate = useNavigate();

  function handleNextStep(value: string) {
    const answer = {
      ...stepData,
      [simulationFormSteps[currentStepIndex].id]: value,
    };
    setStepData(answer);

    if (currentStepIndex + 1 > totalSteps - 1) {
      const id = saveFormData(answer);
      navigate(`/resultado/${id}`);
      return;
    }

    setCurrentStepIndex((prevState) => prevState + 1);
  }

  function saveFormData(data: StepData): string {
    const simulationId = crypto.randomUUID();

    const toStore = {
      ...data,
      id: simulationId,
      createdAt: new Date().toISOString(),
    };
    const storage = localStorage.getItem("simulations");
    const goalStored = storage ? (JSON.parse(storage) as SimulationData[]) : [];

    localStorage.setItem(
      "simulations",
      JSON.stringify([...goalStored, toStore])
    );
    return simulationId;
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
        stepData,
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
