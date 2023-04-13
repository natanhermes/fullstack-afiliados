import { TransactionsContext } from '@/contexts/TransactionsContext';
import { Container } from './styles';
import { useContext } from 'react';
import { MappedOffice } from '@/enums/mapped-office';
import { mappedTransaction } from '@/enums/mapped-transaction-type';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Vendedor</th>
            <th>Função</th>
            <th>Data</th>
          </tr>
        </thead>
        {transactions.length > 0 && (
          <tbody>
            {transactions?.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.product.name}</td>
                <td
                  className={`${mappedTransaction[transaction.type]?.signal}`}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.product.price)}
                </td>
                <td>{mappedTransaction[transaction.type]?.description}</td>
                <td>{transaction.collaborator.name}</td>
                <td>{MappedOffice[transaction.collaborator.type]}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.created_at),
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {transactions.length === 0 && (
        <h3 style={{ textAlign: 'center' }}>
          Você ainda não realizou nenhuma importação.
        </h3>
      )}
    </Container>
  );
}
