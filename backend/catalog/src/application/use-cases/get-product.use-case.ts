import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductEntity | null> {
    return this.productRepository.getProductById(id);
  }
}
