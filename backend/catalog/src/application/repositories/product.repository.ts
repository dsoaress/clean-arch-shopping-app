import { ProductEntity } from "../../domain/entities/product.entity";

export abstract class ProductRepository {
  abstract getProductById(id: string): Promise<ProductEntity | null>;
  abstract getProducts(): Promise<ProductEntity[]>;
  abstract createProduct(product: ProductEntity): Promise<void>;
}
