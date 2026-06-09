import { Content } from "@/components/features/insights/content";
import { Error } from "@/components/features/insights/error";
import { Button } from "@/components/shared/button";
import { Divider } from "@/components/shared/divider";
import { useInsight } from "@/hooks/use-insight";
import { getSimulationDataById } from "@/utils/simulation";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFetcher } from "react-router";

interface AIInsightCard {
  simulationId: string;
}

export function AIInsightCard({ simulationId }: AIInsightCard) {
  const { chat, ...simulation } = getSimulationDataById(simulationId);
  const { insight, isLoading, error, fetchInsight } = useInsight(simulationId);
  const fetcher = useFetcher();
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    divRef.current?.scrollTo({
      top: divRef.current.scrollHeight,
      behavior: "smooth",
    });

    if (fetcher.state === "submitting") {
      inputRef.current!.value = "";
    }
  }, [fetcher.state]);

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
      {!isLoading && insight && !error && (
        <>
          <div
            ref={divRef}
            className="lg:max-h-116 lg:scrollbar-thin lg:[scrollbar-color:var(--border)_transparent] lg:overflow-y-auto"
          >
            <Content insight={insight} />
            {chat &&
              chat.length > 0 &&
              chat.map((message, index) => (
                <>
                  <Divider spacing={24} orientation="horizontal" />
                  <div
                    className="text-muted-foreground space-y-2.5"
                    id={index + 1 === chat.length ? "last-message" : ""}
                  >
                    <span className="flex items-center gap-2 text-base font-semibold">
                      <MessageCircle
                        size={24}
                        strokeWidth={1.5}
                        className="text-primary"
                      />
                      {message.role === "user" ? "Você" : "Resposta da IA"}
                    </span>
                    <p
                      className={
                        message.role === "model" ? "text-foreground" : ""
                      }
                    >
                      {message.text}
                    </p>
                  </div>
                </>
              ))}
            {chat && chat.length > 0 && fetcher.state !== "idle" && (
              <>
                <Divider spacing={24} orientation="horizontal" />
                <div className="text-muted-foreground space-y-2.5">
                  <span className="flex items-center gap-2 text-base font-semibold">
                    <MessageCircle
                      size={24}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                    Resposta da IA
                  </span>
                  <div className="flex">
                    <Skeleton
                      count={3.5}
                      baseColor="var(--color-skeleton-base)"
                      highlightColor="var(--color-skeleton-highlight)"
                      className="mb-3 flex rounded-lg"
                      containerClassName="flex-1"
                      inline
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          <Divider spacing={24} orientation="horizontal" />
          <fetcher.Form
            action={`/resultado/${simulationId}`}
            method="patch"
            className="w-ful flex items-center gap-2.5"
          >
            <input
              type="text"
              name="question"
              className="shadow-default placeholder:text-muted-foreground text-foreground bg-input grow rounded-[20px] px-5 py-4.5 text-sm focus:outline-0"
              placeholder="Quais são os invertimentos mais seguros que eu posso usar para que minha renda aumente?"
              ref={inputRef}
            />
            <Button
              variant="primary"
              type="submit"
              className="rounded-2xl p-4.5"
            >
              <Send size={20} strokeWidth={1.5} />
            </Button>
          </fetcher.Form>
        </>
      )}
    </div>
  );
}
