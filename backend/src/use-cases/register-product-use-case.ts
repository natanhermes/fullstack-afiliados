import { ProductsRepository } from '@/repositories/products-repository';
import { Product } from '@prisma/client';

interface RegisterProductsUseCaseRequest {
  name: string;
  price: number;
  amountSales: number;
  collaboratorId: string;
}

interface RegisterProductsUseCaseResponse {
  product: Product;
}

export class RegisterProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    amountSales,
    price,
    collaboratorId,
  }: RegisterProductsUseCaseRequest): Promise<RegisterProductsUseCaseResponse> {
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
