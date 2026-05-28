import { Button } from "@/components/button";
import { RootLayout } from "@/components/layouts/root-layout";
import { PiggyBank } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <h1>Formulário de Simulação</h1>
            <Button variant="primary">
              <PiggyBank size={20} strokeWidth={1.5} />
              Click aqui
            </Button>
          </>
        ),
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
