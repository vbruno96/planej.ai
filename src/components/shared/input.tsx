import { Divider } from "@/components/shared/divider";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
  suffix?: string;
}

export function Input({ prefix, suffix, ...props }: InputProps) {
  return (
    <div className="bg-input shadow-default flex items-center rounded-2xl p-4">
      {prefix && (
        <>
          <span className="text-muted-foreground text-sm font-medium">
            {prefix}
          </span>
          <Divider orientation="vertical" />
        </>
      )}
      <input
        autoFocus
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
        {...props}
      />
      {suffix && (
        <>
          <Divider orientation="vertical" />
          <span className="text-muded-foreground ml-3 text-sm font-medium">
            {suffix}
          </span>
        </>
      )}
    </div>
  );
}
