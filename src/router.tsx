import { RootLayout } from "@/components/layouts/root-layout";
import { ErrorPage } from "@/pages/error-page";
import { History } from "@/pages/history";
import { SimulationForm } from "@/pages/simulation-form";
import { SimulationResult } from "@/pages/simulation-result";
import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import { getAnswersDataByGoalId } from "./utils/simulation";

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
      },
    ],
  },
]);
