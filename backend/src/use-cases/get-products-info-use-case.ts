import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetProductsInfoUseCaseRequest {
  productId: string;
}

interface GetProductsInfoUseCaseResponse {
  product: Product;
}

export class GetProductsInfoUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: GetProductsInfoUseCaseRequest): Promise<GetProductsInfoUseCaseResponse> {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      throw new ResourceNotFoundError();
    }

    return {
      product,
    };
  }
}
