import { SimulationItem } from "@/components/features/history/simulation-item";
import { Hero } from "@/components/shared/hero";
import type { SimulationData } from "@/context/form-simulation/form-simulation-context";
import { Link, useLoaderData } from "react-router";

export function History() {
  const { simulations } = useLoaderData();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Hero
        title="Histórico de simulções"
        subtitle="Acompanhe o histórico de seus planos financeiros."
      />
      {simulations.length > 0 ? (
        simulations.map((simulation: SimulationData) => (
          <SimulationItem key={simulation.id} simulation={simulation} />
        ))
      ) : (
        <p className="text-muted-foreground text-sm">
          Ainda foi cadastrada nenhuma simulação{" "}
          <Link to="/" className="text-foreground font-semibold">
            clique aqui
          </Link>{" "}
          para cadastrar uma nova
        </p>
      )}
    </main>
  );
}
