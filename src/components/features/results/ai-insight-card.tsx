import { Content } from "@/components/features/insights/content";
import { Error } from "@/components/features/insights/error";
import { useInsight } from "@/hooks/use-insight";
import { getAnswersDataByGoalId } from "@/utils/simulation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AIInsightCard {
  goalId: string;
}

export function AIInsightCard({ goalId }: AIInsightCard) {
  const goal = getAnswersDataByGoalId(goalId);
  const { insight, isLoading, error, fetchInsight } = useInsight(goalId);

  return (
    <div className="bg-card text-foreground space-y-2.5 rounded-2xl p-6 shadow-[4px_4px_18px_0_rgba(0,0,0,.2)] max-sm:order-2 sm:col-span-2">
      <p className="text-primary text-sm font-semibold">
        <span className="mr-1.5">✨</span> Insight Financeiro Personalizado
      </p>
      <h2 className="text-3xl font-semibold sm:text-4xl">
        {`Plano de Ação: ${goal.goalName}`}
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
        <Error goalId={goalId} message={error} onRetry={fetchInsight} />
      )}
      {!isLoading && insight && !error && <Content insight={insight} />}
    </div>
  );
}
