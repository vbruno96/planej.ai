import { Button } from "@/components/shared/button";
import { RefreshCw } from "lucide-react";

interface ErrorProps {
  goalId: string;
  message: string;
  onRetry: (goalId: string) => void;
}

export function Error({ goalId, message, onRetry }: ErrorProps) {
  return (
    <div>
      <p className="tex-sm text-red-500">⚠️ {message}</p>
      <Button
        variant="primary"
        className="px-6"
        onClick={() => onRetry(goalId)}
      >
        <RefreshCw size={16} strokeWidth={1.5} />
        Tentar novamente
      </Button>
    </div>
  );
}
