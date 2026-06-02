import { Header } from "@/components/shared/header";
import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
