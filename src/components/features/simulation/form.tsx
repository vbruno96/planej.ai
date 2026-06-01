import { FormStep } from "@/components/features/simulation/form-step";
import { StepProgress } from "@/components/features/simulation/step-progress";
import { simulationFormSteps } from "@/data/simulation";
import { useFormSimulation } from "@/hooks/use-form-simulation";

export function Form() {
  const { currentStepIndex } = useFormSimulation();
  const currentFormStep = simulationFormSteps[currentStepIndex];

  return (
    <>
      <StepProgress />
      <FormStep key={currentFormStep.id} {...currentFormStep} />
    </>
  );
}
