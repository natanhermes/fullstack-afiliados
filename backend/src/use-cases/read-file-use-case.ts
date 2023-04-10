import { CollaboratorsRepository } from '@/repositories/collaborators-repository';
import { ProductsRepository } from '@/repositories/products-repository';
import { TransactionsRepository } from '@/repositories/transactions-repository';
import {
  TransactionFormatted,
  formatTransaction,
} from '@/utils/format-transactions-from-file';

interface UploadFileUseCaseRequest {
  transactions: string[];
  userId: string;
}

function getCollaboratorsFromTransactions(
  transactions: TransactionFormatted[],
): {
  affiliateds: TransactionFormatted[];
  producers: TransactionFormatted[];
} {
  const products = [
    ...new Set(
      transactions
        .filter((el) => el.productDescription)
        .map((el) => el.productDescription),
    ),
  ];

  const producers = products.flatMap(
    (product) =>
      transactions.filter(
        (transaction) =>
          transaction.productDescription === product && transaction.type === 1,
      )[0],
  );

  const affiliateds = products.flatMap((product) =>
    transactions.filter(
      (transaction) =>
        transaction.productDescription === product && transaction.type === 2,
    ),
  );

  return { affiliateds, producers };
}

/**
 * This role has responsibility for creating the collaborators and their products.
 * @param producers array of producers
 * @param collabRepository repository to create collaborator in database
 * @param productsRepository repository to create product in database
 */
async function createProducersAndProducts(
  producers: TransactionFormatted[],
  collabRepository: CollaboratorsRepository,
  productsRepository: ProductsRepository,
): Promise<void> {
  await Promise.all(
    producers.map(async (product) => {
      const collab = await collabRepository.create({
        type: 'producer',
        name: product.seller,
        commission_balance: 0,
      });

      await productsRepository.create({
        name: product.productDescription,
        amount_sales: 0,
        price: product.transactionValue,
        collaborator_id: collab.id,
      });
    }),
  );
}

/**
 * This role has responsibility for creating the collaborators is type affiliateds.
 * @param affiliateds array of affiliateds
 * @param collabRepository repository to create collaborator in database
 */
async function createAffiliateds(
  affiliateds: TransactionFormatted[],
  collabRepository: CollaboratorsRepository,
): Promise<void> {
  await Promise.all(
    affiliateds.map(async (el) => {
      await collabRepository.create({
        type: 'affiliated',
        name: el.seller,
        commission_balance: 0,
      });
    }),
  );
}

/**
 * This role is responsible for creating transactions in the database with product and collaborator information.
 * @param transactions array of transactitons
 * @param user_id string referring to the user who is uploading the file(logged in user)
 * @param collaboratorsRepository repository to find collaborator in database
 * @param productsRepository repository to create find product in database
 * @param transactionsRepository repository to create transaction in database
 */
async function creataTransactions(
  transactions: TransactionFormatted[],
  user_id: string,
  collaboratorsRepository: CollaboratorsRepository,
  productsRepository: ProductsRepository,
  transactionsRepository: TransactionsRepository,
): Promise<void> {
  await Promise.all(
    transactions.map(async (transaction) => {
      const collab = await collaboratorsRepository.findCollaboratorByName(
        transaction.seller,
      );
      const product = await productsRepository.findProductByName(
        transaction.productDescription,
      );
      if (collab && product) {
        await transactionsRepository.create({
          type: transaction.type,
          collaborator_id: collab.id,
          product_id: product.id,
          user_id,
        });
      }
    }),
  );
}

export class ReadFileUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private collaboratorsRepository: CollaboratorsRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  async execute({
    transactions,
    userId,
  }: UploadFileUseCaseRequest): Promise<TransactionFormatted[]> {
    try {
      const transactionsFormatted = await Promise.all(
        transactions.map(async (el) => await formatTransaction(el)),
      );

      const { affiliateds, producers } = getCollaboratorsFromTransactions(
        transactionsFormatted,
      );

      await createProducersAndProducts(
        producers,
        this.collaboratorsRepository,
        this.productsRepository,
      );

      await createAffiliateds(affiliateds, this.collaboratorsRepository);

      await creataTransactions(
        transactionsFormatted,
        userId,
        this.collaboratorsRepository,
        this.productsRepository,
        this.transactionsRepository,
      );

      return transactionsFormatted;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
