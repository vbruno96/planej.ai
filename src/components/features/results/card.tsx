import type { LucideIcon } from "lucide-react";
import { tv } from "tailwind-variants";

interface CardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtitle: string;
  variant?: "default" | "primary";
}

const cardClass = tv({
  base: "rounded-2xl p-6 shadow-default",
  variants: {
    variant: {
      default: "bg-card",
      primary: "bg-primary",
    },
  },
});

const iconClass = tv({
  variants: {
    variant: {
      default: "text-primary",
      primary: "text-primary-foreground",
    },
  },
});

const labelClass = tv({
  base: "text-xs font-semibold tracking-widest uppercase",
  variants: {
    variant: {
      default: "text-primary",
      primary: "text-primary-foreground",
    },
  },
});

const valueClass = tv({
  base: "text-3xl font-semibold",
  variants: {
    variant: {
      default: "text-foreground",
      primary: "text-primary-foreground",
    },
  },
});

const subtitleClass = tv({
  base: "mt-1 text-sm",
  variants: {
    variant: {
      default: "text-muted-foreground",
      primary: "text-primary-foreground/80",
    },
  },
});

export function Card({
  icon: Icon,
  label,
  subtitle,
  value,
  variant = "default",
}: CardProps) {
  return (
    <div className={cardClass({ variant })}>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={16} strokeWidth={1.5} className={iconClass({ variant })} />
        <span className={labelClass({ variant })}>{label}</span>
      </div>
      <p className={valueClass({ variant })}>{value}</p>
      <p className={subtitleClass({ variant })}>{subtitle}</p>
    </div>
  );
}
