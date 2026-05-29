import { Header } from "@/components/shared/header";
import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
