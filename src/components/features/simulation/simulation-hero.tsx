import piggyBankImage from "@/assets/images/piggy-bank.png";

export function SimulationHero() {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center sm:mb-4.5 sm:flex-row">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          Vamos planejar seu futuro
        </h1>
        <img
          src={piggyBankImage}
          alt=""
          aria-hidden="true"
          className="size-16 sm:-mt-2 sm:-ml-3"
        />
      </div>
      <p className="text-muted-foreground text-sm">
        Responda algumas questões para ter insights financeiro personalizados.
      </p>
    </div>
  );
}
