import { describe, expect, it } from 'vitest';
import { formatNumberToBRL } from './format-number-to-brl';

describe('Format Number to BRL', () => {
  it('should be able to format number to BRL', async () => {
    const number = Number('0000012750');

    const decimalBRL = formatNumberToBRL(number);
    const brlResultToCompare = `${(number / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}`;
    expect(decimalBRL).toEqual(brlResultToCompare);
  });
});
