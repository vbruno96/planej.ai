import { AIInsightCard } from "@/components/features/results/ai-insight-card";
import { Card } from "@/components/features/results/card";
import { FinanceResumeCard } from "@/components/features/results/finance-resume-card";
import { Hero } from "@/components/shared/hero";
import { formatCurrency } from "@/utils/currency";
import { calcMonthlySavings } from "@/utils/simulation";
import {
  CalendarClock,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { useLoaderData } from "react-router";

export function SimulationResult() {
  const { simulation } = useLoaderData();
  const resume = [
    {
      icon: Wallet,
      title: "Renda Mensal",
      value: simulation.income,
      subtitle: "Renda total bruta do mês",
    },
    {
      icon: CreditCard,
      title: "Custos Fixos de Vida",
      value: simulation.expenses,
      subtitle: "Gastos essenciais pro mês",
    },
    {
      icon: Landmark,
      title: "Dívidas / Parcelas",
      value: simulation.debts,
      subtitle: "Valor comprometido em parcelas/depósito",
    },
  ];
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
      <Hero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />
      <section className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da Meta"
          value={simulation.goalAmount}
          subtitle={simulation.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${simulation.goalDeadline} meses`}
          subtitle="Prazo para atingir a meta"
        />
        <Card
          icon={PiggyBank}
          label="Economia Mensal"
          value={formatCurrency(calcMonthlySavings(simulation))}
          subtitle="Economia mensal necessária"
          variant="primary"
        />
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <AIInsightCard simulationId={simulation.id} />
        <FinanceResumeCard title="Resumo das suas finanças" resume={resume} />
      </section>
    </main>
  );
}
