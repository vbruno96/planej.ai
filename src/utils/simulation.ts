import type {
  SimulationData,
  StepData,
} from "@/context/form-simulation/form-simulation-context";
import { parseCurrency } from "@/utils/currency";

export function calcMonthlySavings(data: StepData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debts)
  );
}

export function getSimulationDataById(simulationId: string): SimulationData {
  const storedSimulations = localStorage.getItem("simulations");
  if (!storedSimulations)
    throw new Response("Simulations not found", {
      status: 404,
      statusText: "Simulations Not Found",
    });

  const simulations = JSON.parse(storedSimulations) as SimulationData[];
  const [searchSimulation] = simulations.filter(
    (simulation) => simulation.id === simulationId
  );

  if (!searchSimulation)
    throw new Response("The simulation id informed not exits", {
      status: 404,
      statusText: "Simulation Not Found",
    });

  return searchSimulation;
}

export function updateSimulation(
  simulationId: string,
  updatedSimulation: SimulationData
) {
  const storage = localStorage.getItem("simulations");
  const storedSimulations = storage
    ? (JSON.parse(storage) as SimulationData[])
    : [];

  const updated = storedSimulations.map((simulation) =>
    simulation.id === simulationId ? { ...updatedSimulation } : simulation
  );

  localStorage.setItem("simulations", JSON.stringify(updated));
}

export function getSimulationsStored(): SimulationData[] {
  const storage = localStorage.getItem("simulations");

  const simulations = storage ? (JSON.parse(storage) as SimulationData[]) : [];

  return simulations.reverse();
}

export function deleteSimulationById(simulationId: string): SimulationData[] {
  const simulations = getSimulationsStored();

  const updateSimulations = simulations.filter(
    (simulation) => simulation.id !== simulationId
  );
  localStorage.setItem("simulations", JSON.stringify(updateSimulations));

  return updateSimulations.reverse();
}
