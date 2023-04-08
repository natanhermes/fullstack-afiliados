import { prisma } from '@/lib/prisma';
import { Prisma, Product } from '@prisma/client';
import { ProductsRepository } from '../products-repository';

export class PrismaProductsRepository implements ProductsRepository {
  async findProductByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    return product;
  }
  async findProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }
  async create(data: Prisma.ProductUncheckedCreateInput) {
    const product = await prisma.product.create({
      data,
    });

    return product;
  }
}
