import { ThemeContext } from "@/context/theme/theme-context";
import { useContext } from "react";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error("useTheme should used inside a ThemeProvider");

  return context;
}
