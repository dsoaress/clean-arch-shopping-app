import { ProductEntity, ProductEntityInputProps } from "../../../domain/entities/product.entity";

export const makeProductFactory = (overrides?: Partial<ProductEntityInputProps>): ProductEntity => {
  return new ProductEntity({
    name: "Product Name",
    price: 100,
    currency: "USD",
    description: "Product Description",
    dimensions: {
      width: 10,
      height: 10,
      depth: 10,
      length: 10,
    },
    ...overrides,
  });
};
