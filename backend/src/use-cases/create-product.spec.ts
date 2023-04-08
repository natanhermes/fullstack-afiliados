import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateProductsUseCase } from './create-product-use-case';
import { ItemAlreadyExistsError } from './errors/item-already-exists-error';
import { mockProduct } from '@/utils/test/mocks/mocks-products';

let productsRepository: InMemoryProductsRepository;
let sut: CreateProductsUseCase;
let productMocks: {
  name: string;
  price: number;
  amountSales: number;
  collaboratorId: string;
};
describe('Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new CreateProductsUseCase(productsRepository);
    productMocks = mockProduct;
  });

  it('should be able to create products', async () => {
    const { amountSales, name, price, collaboratorId } = productMocks;
    const { product } = await sut.execute({
      amountSales,
      name,
      price,
      collaboratorId,
    });
    expect(product.id).toEqual(expect.any(String));
  });

  it('should not be able to create product with same name twice', async () => {
    const { amountSales, name, price, collaboratorId } = productMocks;
    await sut.execute({
      name,
      price,
      amountSales,
      collaboratorId,
    });

    const handleDuplicateCreateProduct = () =>
      sut.execute({
        name,
        price,
        amountSales,
        collaboratorId,
      });
    await expect(handleDuplicateCreateProduct).rejects.toBeInstanceOf(
      ItemAlreadyExistsError,
    );
  });
});
