import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { PrismaCollaboratorsRepository } from '@/repositories/prisma/prisma-collaborators-repository';
import { PrismaTransactionsRepository } from '@/repositories/prisma/prisma-transactions-repository';
import { ReadFileUseCase } from '../read-file-use-case';

export function makeReadFileUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const collaboratorsRepository = new PrismaCollaboratorsRepository();
  const transactionsRepository = new PrismaTransactionsRepository();

  const useCase = new ReadFileUseCase(
    productsRepository,
    collaboratorsRepository,
    transactionsRepository,
  );

  return useCase;
}
