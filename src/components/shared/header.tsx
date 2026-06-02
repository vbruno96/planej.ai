import { Button } from "@/components/shared/button";
import { Divider } from "@/components/shared/divider";
import { useTheme } from "@/hooks/use-theme";
import { Clock, Moon, Sun, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-border border-b px-6 py-3">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
            <Wallet
              size={20}
              strokeWidth={1.5}
              className="text-primary-foreground"
            />
          </div>
          <span className="text-lg">
            <span className="text-muted-foreground font-medium">Planej</span>
            <span className="font-extrabold">.ai</span>
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="secondary" onClick={() => void navigate("/")}>
            <TrendingUp size={20} strokeWidth={1.5} />
            <span className="hidden sm:inline">Nova Simulação</span>
          </Button>
          <Button variant="ghost" onClick={() => void navigate("/historico")}>
            <Clock size={20} strokeWidth={1.5} />
            <span className="hidden sm:inline">Histórico</span>
          </Button>
          <Divider orientation="vertical" />
          <Button
            variant="ghost"
            aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
            onClick={toggleTheme}
          >
            {theme === "light" ? (
              <Moon size={20} strokeWidth={1.5} />
            ) : (
              <Sun size={20} strokeWidth={1.5} />
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}
