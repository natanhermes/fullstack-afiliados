import { ProductsRepository } from '@/repositories/products-repository';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import { formatTransaction } from '@/utils/format-transactions-from-file';

interface UploadFileUseCaseRequest {
  transactions: string[];
}

// interface UploadFileUseCaseResponse {
//   a: User;
// }

export class ReadFileUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async execute({ transactions }: UploadFileUseCaseRequest): Promise<any> {
    const transactionsFormatted = await Promise.all(
      transactions.map(async (el) => await formatTransaction(el)),
    );

    const products = [
      ...new Set(
        transactionsFormatted
          .filter((el) => el.productDescription)
          .map((el) => el.productDescription),
      ),
    ];

    const collabProducts = products.flatMap((product) =>
      transactionsFormatted.filter(
        (transaction) => transaction.productDescription === product,
      ),
    );

    return collabProducts;
  }
}
