import { Prisma, Product } from '@prisma/client';

export interface ProductsRepository {
  findProductByName(name: string): Promise<Product | null>;
  findProductById(id: string): Promise<Product | null>;
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
}
