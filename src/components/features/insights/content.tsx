import type { InsightData } from "@/services/aiService";
import { tv } from "tailwind-variants";

interface ContentProps {
  insight: InsightData;
}

const status = {
  viable: "Meta Viável no prazo",
  needs_adjustment: "Ajuste necessário",
  unfeasible: "Meta inviável no prazo",
};

const statusClasse = tv({
  base: "w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold",
  variants: {
    status: {
      viable:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      needs_adjustment:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      unfeasible:
        "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  },
});

export function Content({ insight }: ContentProps) {
  return (
    <div className="lg:pr-2">
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          <span className="text-foreground text-sm font-semibold">
            🎯 Viabilidade da Meta
          </span>
          <span
            className={statusClasse({ status: insight.feasibility.status })}
          >
            {status[insight.feasibility.status]}
          </span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {insight.feasibility.content}
        </p>
      </section>

      <section>
        <h4 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
          💰 Diagnóstico Financeiro
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {insight.diagnosis.content}
        </p>
      </section>

      <section>
        <h4 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
          📋 Sugestões Práticas
        </h4>
        <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
          {insight.suggestions.items.map((item) => (
            <li className="pl-1">{item}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
          💡 Como Aumentar sua Renda
        </h4>
        <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
          {insight.extraIncome.items.map((item) => (
            <li className="pl-1">{item}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
          🏦 Sugestões de Investimento
        </h4>
        <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
          {insight.investment.items.map((item) => (
            <li className="pl-1">{item}</li>
          ))}
        </ol>
      </section>

      <section>
        <h4 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
          🚀 Mensagem Final
        </h4>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {insight.motivation.content}
        </p>
      </section>
    </div>
  );
}
