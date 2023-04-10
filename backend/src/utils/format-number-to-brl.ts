export function formatNumberToBRL(number: number): string {
  const BRL = `${(number / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })}`;
  return BRL;
}
