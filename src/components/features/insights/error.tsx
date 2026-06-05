import { Button } from "@/components/shared/button";
import { RefreshCw } from "lucide-react";

interface ErrorProps {
  simulationId: string;
  message: string;
  onRetry: (simulationId: string) => void;
}

export function Error({ simulationId, message, onRetry }: ErrorProps) {
  return (
    <div>
      <p className="tex-sm text-red-500">⚠️ {message}</p>
      <Button
        variant="primary"
        className="px-6"
        onClick={() => onRetry(simulationId)}
      >
        <RefreshCw size={16} strokeWidth={1.5} />
        Tentar novamente
      </Button>
    </div>
  );
}
