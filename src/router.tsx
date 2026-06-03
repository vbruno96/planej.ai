import { RootLayout } from "@/components/layouts/root-layout";
import { ErrorPage } from "@/pages/error-page";
import { History } from "@/pages/history";
import { SimulationForm } from "@/pages/simulation-form";
import { SimulationResult } from "@/pages/simulation-result";
import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import {
  deleteGoalById,
  getAnswersDataByGoalId,
  getGoalsStored,
} from "./utils/simulation";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: SimulationForm,
      },
      {
        path: "resultado/:id",
        Component: SimulationResult,
        loader: async ({ params }: LoaderFunctionArgs) => {
          const { id } = params;

          if (!id)
            throw new Response("The goal id was necessary", {
              status: 404,
              statusText: "Goal Not Found",
            });

          return { goal: getAnswersDataByGoalId(id) };
        },
      },
      {
        path: "historico",
        Component: History,
        loader: async () => {
          const simulations = getGoalsStored();

          return { simulations };
        },
        action: async ({ request }) => {
          const actionData = await request.formData();
          const simulationId = actionData.get("simulationId");
          if (!simulationId)
            throw new Response("No ID was sent", {
              status: 400,
              statusText: "No ID",
            });
          const updateGoals = deleteGoalById(simulationId.toString());
          return updateGoals;
        },
      },
    ],
  },
]);
