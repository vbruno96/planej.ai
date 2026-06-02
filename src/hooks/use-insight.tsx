import type { GoalData } from "@/context/form-simulation/form-simulation-context";
import { buildAIPrompt } from "@/data/aiPrompt";
import { getInsight, type InsightData } from "@/services/aiService";
import {
  getAnswersDataByGoalId,
  updateGoalWithInsight,
} from "@/utils/simulation";
import { useCallback, useEffect, useRef, useState } from "react";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const [insight, setInsight] = useState<InsightData | null>(() => {
    const goal = getAnswersDataByGoalId(id);

    if (!goal.insight) return null;

    return goal.insight;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async (goalId: string) => {
    const goal = getAnswersDataByGoalId(goalId);
    isRequestPending.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const prompt = buildAIPrompt(goal);
      const data = await getInsight(prompt);
      setInsight(data);

      updateGoalWithInsight(goalId, { ...goal, insight: data } as GoalData);
    } catch {
      setError("Fail to get insight. Try again");
    } finally {
      isRequestPending.current = true;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (insight || isLoading || error || isRequestPending.current) return;

    fetchInsight(id);
  }, [insight, isLoading, error, fetchInsight, id]);

  return { insight, isLoading, error, fetchInsight };
};
