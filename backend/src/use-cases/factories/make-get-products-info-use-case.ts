import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { GetProductsInfoUseCase } from '../get-products-info-use-case';

export function makeGetProductInfoUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new GetProductsInfoUseCase(productsRepository);

  return useCase;
}
