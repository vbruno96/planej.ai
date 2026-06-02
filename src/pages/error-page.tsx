import piggyBankBroken from "@/assets/images/piggy-bank-broken.png";
import { Header } from "@/components/shared/header";
import {
  isRouteErrorResponse,
  useRouteError,
  type ErrorResponse,
} from "react-router";

export function ErrorPage() {
  const error = useRouteError() as ErrorResponse | Error;
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center py-10 sm:py-14">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Ooops...
        </h1>
        <img
          src={piggyBankBroken}
          alt=""
          aria-hidden="true"
          className="size-80"
          width={320}
        />
        {isRouteErrorResponse(error) ? (
          <p className="text-muted-foreground text-sm">{error.data}</p>
        ) : (
          <p className="text-muted-foreground text-sm">{error.message}</p>
        )}
      </main>
    </>
  );
}
