export interface TransactionFormatted {
  type: number;
  date: Date;
  productDescription: string;
  transactionValue: number;
  seller: string;
}

type TransactionType = {
  type: number;
  description: string;
  kind: 'Input' | 'Output';
  signal: '+' | '-';
};

const TRANSACTION_TYPES: TransactionType[] = [
  {
    type: 1,
    description: 'Producer Sale',
    kind: 'Input',
    signal: '+',
  },
  {
    type: 2,
    description: 'Affiliated Sale',
    kind: 'Input',
    signal: '+',
  },
  {
    type: 3,
    description: 'Commission paid',
    kind: 'Output',
    signal: '-',
  },
  {
    type: 4,
    description: 'Commission received',
    kind: 'Input',
    signal: '+',
  },
];

function getTransactionType(type: number): TransactionType {
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
    type: getTransactionType(Number(transaction[0])).type,
    description: getTransactionType(Number(transaction[0])).description,
    value: transaction.substring(57, 66),
    date: transaction.substring(1, 26),
  };

  return {
    type: transactionFormatted.type,
    date: new Date(transactionFormatted.date),
    productDescription: product.name,
    transactionValue: Number(transactionFormatted.value) / 100,
    seller,
  };
}
