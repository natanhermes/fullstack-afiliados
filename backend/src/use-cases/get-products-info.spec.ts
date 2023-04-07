import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { GetProductsInfoUseCase } from './get-products-info-use-case';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let productsRepository: InMemoryProductsRepository;
/**
 * System Under Test
 */
let sut: GetProductsInfoUseCase;
let productMocks: {
  name: string;
  price: number;
  amountSales: number;
  collaboratorId: string;
};
describe('Get Products Use Case', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository();
    sut = new GetProductsInfoUseCase(productsRepository);
    productMocks = {
      name: 'John Doe Class',
      amountSales: 0,
      price: 21500,
      collaboratorId: 'collab-1',
    };
  });

  it('should be able to get products info', async () => {
    const { amountSales, name, price, collaboratorId } = productMocks;

    const productCreatead = await productsRepository.create({
      name,
      price,
      amount_sales: amountSales,
      collaborator_id: collaboratorId,
    });

    const { product } = await sut.execute({
      productId: productCreatead.id,
    });
    expect(product.id).toEqual(expect.any(String));
  });

  it('should not be able to get products info with wrong id', async () => {
    const handleProductNotExists = () =>
      sut.execute({
        productId: 'non-existing-id',
      });
    await expect(handleProductNotExists).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
