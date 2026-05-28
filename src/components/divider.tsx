import { tv } from "tailwind-variants";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  spacing?: number;
  className?: string;
}

const dividerClasses = tv({
  base: "bg-border",
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "self-stretch w-px",
    },
  },
});

export function Divider({
  orientation = "horizontal",
  spacing = 16,
  className,
}: DividerProps) {
  const style =
    orientation === "horizontal"
      ? { marginBlock: spacing }
      : { marginInline: spacing };

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      style={style}
      className={dividerClasses({ orientation, class: className })}
    />
  );
}
