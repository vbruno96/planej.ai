interface HeroProps {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="mb-6 w-full space-y-2">
      <h1 className="text-foreground text-2xl font-semibold sm:text-3xl">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </section>
  );
}
