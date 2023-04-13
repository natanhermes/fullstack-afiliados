import Image from 'next/image';

import incomeImg from '../../../public/income.svg';
import outcomeImg from '../../../public/outcome.svg';
import totalImg from '../../../public/total.svg';

import { Container } from './styles';
import { useContext } from 'react';
import { TransactionsContext } from '@/contexts/TransactionsContext';

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const outputTransactions = transactions.filter(
    (transaction) => transaction.type === 3 && transaction.product.price,
  );

  const totalOutputTransactions = outputTransactions
    .map((transaction) => transaction.product.price)
    .reduce((acc, crr) => acc + crr, 0);

  const inputTransactions = transactions.filter(
    (el) => !outputTransactions.includes(el),
  );

  const totalInputTransactins = inputTransactions
    .map((transaction) => transaction.product.price)
    .reduce((acc, crr) => acc + crr, 0);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <Image src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalInputTransactins)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <Image src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalOutputTransactions)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <Image src={totalImg} alt="Saídas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(totalInputTransactins - totalOutputTransactions)}
        </strong>
      </div>
    </Container>
  );
}
