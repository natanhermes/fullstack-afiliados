import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { api } from '../services/client';
import { AuthContext } from './AuthContext';

interface Collaborator {
  id: string;
  name: string;
  type: 'producer' | 'affiliated';
}

interface Product {
  id: string;
  name: string;
  price: number;
  amount_sales: number;
}

interface Transaction {
  id: string;
  type: 1 | 2 | 3 | 4;
  created_at: string;
  collaborator: Collaborator;
  product: Product;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  getTransactions(): Promise<void>;
  uploadFile(file: any): Promise<void>;
  transactions: Transaction[];
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const { user } = useContext(AuthContext);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function getTransactions(): Promise<void> {
    try {
      const response = await api.get('/transactions/history');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error(error as string);
    }
  }

  async function uploadFile(file: File) {
    try {
      const formData = new FormData();

      formData.append('file', file);

      const reqConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      await api.post('/transactions/upload', formData, reqConfig);
      await getTransactions();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getTransactions();
    }

    () => {
      setTransactions([]);
    };
  }, [user]);

  return (
    <TransactionsContext.Provider
      value={{ transactions, getTransactions, uploadFile }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
