import type { ButtonHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "ghost" | "icon";
}

const buttonClasses = tv({
  base: "flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground font-semibold rounded-xl",
      secondary: "bg-secondary-button border border-border rounded-3xl",
      ghost: "rounded-lg text-foreground",
      icon: "p-3 bg-secondary-button border border-border rounded-lg",
    },
  },
});

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, class: className })}
      {...props}
    />
  );
}
