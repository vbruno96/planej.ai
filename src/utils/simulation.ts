import type {
  AnswerData,
  GoalData,
} from "@/context/form-simulation/form-simulation-context";
import { parseCurrency } from "@/utils/currency";

export function calcMonthlySavings(data: AnswerData) {
  return (
    parseCurrency(data.income) -
    parseCurrency(data.expenses) -
    parseCurrency(data.debts)
  );
}

export function getAnswersDataByGoalId(goalId: string): GoalData {
  const storedGoals = localStorage.getItem("goals");
  if (!storedGoals)
    throw new Response("Goals not found", {
      status: 404,
      statusText: "Goals Not Found",
    });

  const goals = JSON.parse(storedGoals) as GoalData[];
  const [searchGoal] = goals.filter((goal) => goal.id === goalId);

  if (!searchGoal)
    throw new Response("The goal id informed not exits", {
      status: 404,
      statusText: "Goal Not Found",
    });

  return searchGoal;
}

export function updateGoalWithInsight(goalId: string, updatedGoal: GoalData) {
  const storage = localStorage.getItem("goals");
  const storedGoals = storage ? (JSON.parse(storage) as GoalData[]) : [];

  const updated = storedGoals.map((goal) =>
    goal.id === goalId ? { ...updatedGoal } : goal
  );

  localStorage.setItem("goals", JSON.stringify(updated));
}
