import {
  FormSimulationContext,
  type AnswerData,
  type GoalData,
} from "@/context/form-simulation/form-simulation-context";
import { simulationFormSteps } from "@/data/simulation";
import { useState, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

export function ForSimulationProvider({ children }: PropsWithChildren) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [goalData, setGoalData] = useState<GoalData[]>(() => {
    const storedGoals = localStorage.getItem("goals");

    if (!storedGoals) return [];

    return JSON.parse(storedGoals);
  });
  const [answerData, setAnswerData] = useState({} as AnswerData);

  const goalId = uuid();

  const totalSteps = simulationFormSteps.length;
  const navigate = useNavigate();

  function handleNextStep(value: string) {
    setAnswerData((prevState) => {
      const answer = { ...prevState };
      answer[simulationFormSteps[currentStepIndex].id] = value;
      return answer;
    });

    if (currentStepIndex + 1 > totalSteps - 1) {
      setGoalData((prevState) => {
        const goal = {} as GoalData;
        goal[goalId] = answerData;
        const updatedAnswersData = [...prevState, goal];
        localStorage.setItem("goals", JSON.stringify(updatedAnswersData));
        return updatedAnswersData;
      });
      navigate("/resultado");
      return;
    }

    setCurrentStepIndex((prevState) => prevState + 1);
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
        goalData,
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
