import { Product, Prisma } from '@prisma/client';
import { ProductsRepository } from '../products-repository';
import { randomUUID } from 'node:crypto';
import { ItemAlreadyExistsError } from '@/use-cases/errors/item-already-exists-error';

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = [];
  async findProductByName(name: string): Promise<Product | null> {
    const product = this.items.find((el) => el.name === name);

    if (!product) {
      return null;
    }

    return product;
  }
  async findProductById(id: string): Promise<Product | null> {
    const product = this.items.find((el) => el.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    const productExists = this.items.find((el) => el.name === data.name);

    if (productExists) {
      throw new ItemAlreadyExistsError();
    }

    const product: Product = {
      id: randomUUID(),
      name: data.name,
      price: data.price,
      amount_sales: data.amount_sales,
      collaborator_id: data.collaborator_id,
    };

    this.items.push(product);
    return product;
  }
}
