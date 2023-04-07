import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';
import { CreateProductsUseCase } from '../create-product-use-case';

export function makeCreateProductUseCase() {
  const productsRepository = new PrismaProductsRepository();
  const useCase = new CreateProductsUseCase(productsRepository);

  return useCase;
}
