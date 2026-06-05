import type { SimulationData } from "@/context/form-simulation/form-simulation-context";
import { buildAIPrompt } from "@/data/aiPrompt";
import { getInsight, type InsightData } from "@/services/aiService";
import { getSimulationDataById, updateSimulation } from "@/utils/simulation";
import { useCallback, useEffect, useRef, useState } from "react";

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false);
  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getSimulationDataById(id);

    if (!simulation.insight) return null;

    return simulation.insight;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(async (simulationId: string) => {
    const simulation = getSimulationDataById(simulationId);
    isRequestPending.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const prompt = buildAIPrompt(simulation);
      const data = await getInsight(prompt);
      setInsight(data);

      updateSimulation(simulationId, {
        ...simulation,
        insight: data,
      } as SimulationData);
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
