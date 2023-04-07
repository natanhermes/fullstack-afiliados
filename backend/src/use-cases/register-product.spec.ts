import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterProductsUseCase } from './register-product-use-case';

let productsRepository: InMemoryProductsRepository;
let sut: RegisterProductsUseCase;
let productMocks: {
  name: string;
  price: number;
  amountSales: number;
  collaboratorId: string;
};
describe('Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new RegisterProductsUseCase(productsRepository);
    productMocks = {
      name: 'John Doe Class',
      amountSales: 0,
      price: 21500,
      collaboratorId: 'collab-1',
    };
  });

  it('should be able to register products', async () => {
    const { amountSales, name, price, collaboratorId } = productMocks;
    const { product } = await sut.execute({
      amountSales,
      name,
      price,
      collaboratorId,
    });
    expect(product.id).toEqual(expect.any(String));
  });
});
