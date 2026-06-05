import { Content } from "@/components/features/insights/content";
import { Error } from "@/components/features/insights/error";
import { useInsight } from "@/hooks/use-insight";
import { getSimulationDataById } from "@/utils/simulation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AIInsightCard {
  simulationId: string;
}

export function AIInsightCard({ simulationId }: AIInsightCard) {
  const simulation = getSimulationDataById(simulationId);
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);

  return (
    <div className="bg-card text-foreground shadow-default space-y-2.5 rounded-2xl p-6 max-sm:order-2 sm:col-span-2">
      <p className="text-primary text-sm font-semibold">
        <span className="mr-1.5">✨</span> Insight Financeiro Personalizado
      </p>
      <h2 className="text-3xl font-semibold sm:text-4xl">
        {`Plano de Ação: ${simulation.goalName}`}
      </h2>
      {isLoading && (
        <div className="flex">
          <Skeleton
            count={16.5}
            baseColor="var(--color-skeleton-base)"
            highlightColor="var(--color-skeleton-highlight)"
            className="mb-3 flex rounded-lg"
            containerClassName="flex-1"
            inline
          />
        </div>
      )}
      {!isLoading && error && (
        <Error
          simulationId={simulationId}
          message={error}
          onRetry={fetchInsight}
        />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}
    </div>
  );
}
