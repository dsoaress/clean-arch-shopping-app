import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";

export class GetProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return this.productRepository.getProducts();
  }
}
