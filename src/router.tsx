import { RootLayout } from "@/components/layouts/root-layout";
import { createBrowserRouter } from "react-router-dom";
import { SimulationForm } from "@/pages/simulation-form";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <SimulationForm />,
      },
      {
        path: "/resultado",
        element: <h1>Resultado da Simulação</h1>,
      },
      {
        path: "/historico",
        element: <h1>Histórico da Simulação</h1>,
      },
    ],
  },
]);
