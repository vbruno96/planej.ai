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
  const { goal } = useLoaderData();
  const resume = [
    {
      icon: Wallet,
      title: "Renda Mensal",
      value: goal.income,
      subtitle: "Renda total bruta do mês",
    },
    {
      icon: CreditCard,
      title: "Custos Fixos de Vida",
      value: goal.expenses,
      subtitle: "Gastos essenciais pro mês",
    },
    {
      icon: Landmark,
      title: "Dívidas / Parcelas",
      value: goal.debts,
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
          value={goal.goalAmount}
          subtitle={goal.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${goal.goalDeadline} meses`}
          subtitle="Prazo para atingir a meta"
        />
        <Card
          icon={PiggyBank}
          label="Economia Mensal"
          value={formatCurrency(calcMonthlySavings(goal))}
          subtitle="Economia mensal necessária"
          variant="primary"
        />
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <AIInsightCard goalId={goal.id} />
        <FinanceResumeCard title="Resumo das suas finanças" resume={resume} />
      </section>
    </main>
  );
}
