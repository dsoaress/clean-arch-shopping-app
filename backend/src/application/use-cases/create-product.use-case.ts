import { ProductEntity, ProductEntityInputProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(product: ProductEntityInputProps) {
    await this.productRepository.createProduct(new ProductEntity(product));
  }
}
