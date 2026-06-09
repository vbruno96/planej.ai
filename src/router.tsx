import { RootLayout } from "@/components/layouts/root-layout";
import { ErrorPage } from "@/pages/error-page";
import { History } from "@/pages/history";
import { SimulationForm } from "@/pages/simulation-form";
import { SimulationResult } from "@/pages/simulation-result";
import { createBrowserRouter, type LoaderFunctionArgs } from "react-router";
import type { SimulationData } from "./context/form-simulation/form-simulation-context";
import { buildAIQuestionContext } from "./data/aiPrompt";
import { getAiAnswer, type GeminiPayload } from "./services/aiService";
import {
  deleteSimulationById,
  getSimulationDataById,
  getSimulationsStored,
  updateSimulation,
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
            throw new Response("The simulation id was necessary", {
              status: 404,
              statusText: "Simulation Not Found",
            });

          return { simulation: getSimulationDataById(id) };
        },
        action: async ({ request, params }) => {
          try {
            const { id } = params;
            if (!id)
              throw new Response("Simulation id no was sent", {
                status: 400,
                statusText: "ID no was sent",
              });

            const actionData = await request.formData();
            const question = actionData.get("question")?.toString();
            if (!question)
              throw new Response("Question is empty or no was sent", {
                status: 400,
                statusText: "Question is empty or no was sent",
              });

            const simulation = getSimulationDataById(id);
            const payload = buildAIQuestionContext(simulation, question);

            const chat = simulation.chat ?? [];
            chat.push({ role: "user", text: question });
            const updatedSimulation = {
              ...simulation,
              chat,
            } as SimulationData;

            updateSimulation(id, updatedSimulation);

            const response = await getAiAnswer(payload as GeminiPayload);
            chat.push({ role: response.role, text: response.parts[0].text } as {
              role: "user" | "model";
              text: string;
            });
            updateSimulation(id, {
              ...updatedSimulation,
              chat,
            } as SimulationData);
          } catch (error) {
            console.error(error);
            return {
              error: {
                message: "Fail to get AI answer, try again",
              },
            };
          }
        },
      },
      {
        path: "historico",
        Component: History,
        loader: async () => {
          const simulations = getSimulationsStored();

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
          const updateSimulations = deleteSimulationById(
            simulationId.toString()
          );
          return updateSimulations;
        },
      },
    ],
  },
]);
