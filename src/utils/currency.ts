export function formatCurrencyMask(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  const number = Number(digits) / 100;

  if (isNaN(number)) return "";

  return number.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(value: number | string): string {
  if (typeof value === "string")
    return parseFloat(
      value.replace(/\./g, "").replace(",", ".")
    ).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: "currency",
      currency: "BRL",
    });

  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: "currency",
    currency: "BRL",
  });
}

export function parseCurrency(value: string) {
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}
