import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';
import { ItemAlreadyExistsError } from './errors/item-already-exists-error';

interface CreateProductsUseCaseRequest {
  name: string;
  price: number;
  amountSales: number;
  collaboratorId: string;
}

interface CreateProductsUseCaseResponse {
  product: Product;
}

export class CreateProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    amountSales,
    price,
    collaboratorId,
  }: CreateProductsUseCaseRequest): Promise<CreateProductsUseCaseResponse> {
    await this.productsRepository.findProductByName(name);

    const product = await this.productsRepository.create({
      name,
      amount_sales: amountSales,
      price,
      collaborator_id: collaboratorId,
    });

    return {
      product,
    };
  }
}
