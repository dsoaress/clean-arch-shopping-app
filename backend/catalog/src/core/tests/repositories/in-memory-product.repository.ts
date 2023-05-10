import { ProductRepository } from "../../../application/repositories/product.repository";
import { ProductEntity } from "../../../domain/entities/product.entity";

export class InMemoryProductRepository implements ProductRepository {
  private products: ProductEntity[] = [];

  async getProductById(id: string): Promise<ProductEntity | null> {
    return this.products.find((product) => product.id === id) || null;
  }

  async getProducts(): Promise<ProductEntity[]> {
    return this.products;
  }

  async createProduct(product: ProductEntity): Promise<void> {
    this.products.push(product);
  }
}
