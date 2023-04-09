export interface TransactionFormatted {
  type: string;
  date: Date;
  productDescription: string;
  transactionValue: string;
  seller: string;
}

type TransactionType = {
  type: string;
  description: string;
  kind: 'Input' | 'Output';
  signal: '+' | '-';
};

const TRANSACTION_TYPES: TransactionType[] = [
  {
    type: '1',
    description: 'Producer Sale',
    kind: 'Input',
    signal: '+',
  },
  {
    type: '2',
    description: 'Affiliated Sale',
    kind: 'Input',
    signal: '+',
  },
  {
    type: '3',
    description: 'Commission paid',
    kind: 'Output',
    signal: '-',
  },
  {
    type: '4',
    description: 'Commission received',
    kind: 'Input',
    signal: '+',
  },
];

function getTransactionType(type: string): TransactionType {
  return TRANSACTION_TYPES.filter(
    (transaction) => transaction.type === type,
  )[0];
}

export async function formatTransaction(
  transaction: string,
): Promise<TransactionFormatted> {
  const seller = transaction.substring(66, 85);

  const product = {
    name: transaction.substring(26, 56).trim(),
  };

  const transactionFormatted = {
    type: getTransactionType(transaction[0]).type,
    description: getTransactionType(transaction[0]).description,
    value: transaction.substring(57, 66),
    date: transaction.substring(1, 26),
  };

  return {
    type: transactionFormatted.type,
    date: new Date(transactionFormatted.date),
    productDescription: product.name,
    transactionValue: transactionFormatted.value,
    seller,
  };
}
