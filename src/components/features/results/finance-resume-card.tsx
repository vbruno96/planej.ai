import { formatCurrency } from "@/utils/currency";
import type { LucideIcon } from "lucide-react";

interface FinanceResumeCardProps {
  title: string;
  resume: {
    icon: LucideIcon;
    title: string;
    value: string;
    subtitle: string;
  }[];
}

export function FinanceResumeCard({ title, resume }: FinanceResumeCardProps) {
  return (
    <div className="bg-card shadow-default rounded-2xl p-6">
      <h3 className="text-foreground text-3xl font-semibold sm:text-4xl">
        {title}
      </h3>
      {resume.map((info) => {
        const Icon = info.icon;

        return (
          <div
            key={info.title}
            className="border-border space-y-2.5 py-10 not-last:border-b"
          >
            <span className="text-primary flex items-center gap-3 text-sm font-semibold uppercase">
              <Icon size={24} strokeWidth={1.5} />
              {info.title}
            </span>
            <strong className="mb-text-foreground inline-block text-3xl font-semibold sm:text-4xl">
              {formatCurrency(info.value)}
            </strong>
            <p className="textt-sm text-muted-foreground">{info.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
}
