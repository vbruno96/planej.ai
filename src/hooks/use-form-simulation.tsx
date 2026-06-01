import { FormSimulationContext } from "@/context/form-simulation/form-simulation-context";
import { useContext } from "react";

export function useFormSimulation() {
  const context = useContext(FormSimulationContext);

  if (context === undefined) {
    throw new Error(
      "useFormSimulation should used inside a ForSimulationProvider"
    );
  }

  return context;
}
