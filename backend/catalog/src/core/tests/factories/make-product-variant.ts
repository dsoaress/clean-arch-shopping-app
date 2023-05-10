import {
  ProductVariantEntity,
  ProductVariantEntityInputProps,
} from "../../../domain/entities/product-variant.entity";

export const makeProductVariantFactory = (
  overrides?: Partial<ProductVariantEntityInputProps>
): ProductVariantEntity => {
  return new ProductVariantEntity({
    type: "COLOR",
    description: "Product Color",
    image: "https://example.com/image.png",
    ...overrides,
  });
};
