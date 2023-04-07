import { Prisma, Product } from '@prisma/client';

export interface ProductsRepository {
  findProductById(id: string): Promise<Product | null>;
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
}
