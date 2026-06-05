import { Button } from "@/components/shared/button";
import { Divider } from "@/components/shared/divider";
import type { SimulationData } from "@/context/form-simulation/form-simulation-context";
import { formatCurrency } from "@/utils/currency";
import { calcMonthlySavings } from "@/utils/simulation";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Goal, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useNavigate, useSubmit } from "react-router";

interface SimulationItemProps {
  simulation: SimulationData;
}

export function SimulationItem({ simulation }: SimulationItemProps) {
  const navigate = useNavigate();
  const submit = useSubmit();

  const handleDeleteSimulation = useCallback(
    (simulationId: string) => {
      submit({ simulationId }, { action: "/historico", method: "DELETE" });
    },
    [submit]
  );

  return (
    <div
      key={simulation.id}
      className="bg-card shadow-default flex flex-col gap-6 rounded-2xl p-8 not-last:mb-6 lg:flex-row lg:items-center lg:gap-8"
    >
      <span className="text-primary flex size-10 items-center justify-center rounded-xl bg-[#ece5f8]">
        <Goal size={26} strokeWidth={1.5} />
      </span>
      <div className="flex-1 space-y-1">
        <strong className="text-foreground inline-block text-base font-semibold">
          {simulation.goalName}
        </strong>
        <p className="text-muted-foreground text-sm">
          {new Intl.DateTimeFormat("pt-BR").format(
            new Date(simulation.createdAt)
          )}
        </p>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-muted-foreground text-xs font-semibold uppercase">
          Custo da meta
        </p>
        <strong className="text-foreground inline-block text-base font-semibold">
          {formatCurrency(simulation.goalAmount)}
        </strong>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-muted-foreground text-xs font-semibold uppercase">
          Prazo
        </p>
        <strong className="text-foreground inline-block text-base font-semibold">
          {`${simulation.goalDeadline} meses`}
        </strong>
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-muted-foreground text-xs font-semibold uppercase">
          Economia Mensal
        </p>
        <strong className="text-foreground inline-block text-base font-semibold">
          {formatCurrency(calcMonthlySavings(simulation))}
        </strong>
      </div>
      <Divider orientation="horizontal" className="lg:hidden" spacing={0} />
      <div className="flex items-center lg:gap-8">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="ghost" className="flex-1 lg:order-2">
              <Trash2 size={24} strokeWidth={1.5} className="text-red-500" />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="bg-background/90 data-[state=open]:animate-overlay-show fixed inset-0" />
            <Dialog.Content className="bg-card shadow-default data-[state=open]:animate-content-show fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-125 -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-2xl p-8">
              <Dialog.Title className="text-primary-foreground text-2xl font-semibold sm:text-3xl">
                Deletar simulação!
              </Dialog.Title>
              <Dialog.Description>
                Deseja realmente deletar a simulação:{" "}
                <strong className="text-primary font-semibold">{`${simulation.goalName}?`}</strong>
              </Dialog.Description>
              <div className="flex items-center justify-end gap-6">
                <Dialog.Close asChild>
                  <Button
                    variant="primary"
                    className="bg-muted-foreground w-24"
                  >
                    Cancelar
                  </Button>
                </Dialog.Close>
                <Button
                  variant="primary"
                  className="w-24"
                  onClick={() => handleDeleteSimulation(simulation.id)}
                >
                  Deletar
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <Divider
          orientation="vertical"
          className="lg:order-1 lg:mx-0!"
          spacing={28}
        />
        <Button
          onClick={() => navigate(`/resultado/${simulation.id}`)}
          variant="secondary"
          className="lg:order-3"
        >
          <ExternalLink size={16} strokeWidth={1.5} />
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
