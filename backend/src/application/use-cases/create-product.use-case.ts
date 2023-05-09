import {
  ProductVariantEntity,
  ProductVariantEntityInputProps,
} from "../../domain/entities/product-variant.entity";
import { ProductEntity, ProductEntityInputProps } from "../../domain/entities/product.entity";
import { ProductRepository } from "../repositories/product.repository";

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    variants,
    ...product
  }: Omit<ProductEntityInputProps, "variants"> & { variants: ProductVariantEntityInputProps[] }) {
    await this.productRepository.createProduct(
      new ProductEntity({
        ...product,
        variants: variants.map((v) => new ProductVariantEntity(v)),
      })
    );
  }
}
