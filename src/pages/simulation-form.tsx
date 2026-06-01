import { Form } from "@/components/features/simulation/form";
import { SimulationHero } from "@/components/features/simulation/simulation-hero";
import { ForSimulationProvider } from "@/context/form-simulation/form-simulation-provider";

export function SimulationForm() {
  return (
    <ForSimulationProvider>
      <main className="mx-auto max-w-xl px-6 py-10 sm:py-14">
        <SimulationHero />
        <Form />
      </main>
    </ForSimulationProvider>
  );
}
