import { randomUUID } from "node:crypto";

import { ProductEntity, ProductEntityInputProps } from "../../../domain/entities/product.entity";
import { makeProductVariantFactory } from "./make-product-variant";

export const makeProductFactory = (overrides?: Partial<ProductEntityInputProps>): ProductEntity => {
  return new ProductEntity({
    name: "Product Name",
    price: 100,
    currency: "USD",
    description: "Product Description",
    images: ["https://example.com/image.png"],
    variants: [makeProductVariantFactory()],
    dimensions: { width: 10, height: 10, depth: 10, length: 10 },
    ...overrides,
  });
};
