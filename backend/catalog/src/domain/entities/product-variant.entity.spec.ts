import { ProductVariantEntity } from "./product-variant.entity";
import { makeProductVariantFactory } from "../../core/tests/factories/make-product-variant";

describe("ProductVariantEntity", () => {
  it("should create a product variant entity", () => {
    const productVariant = makeProductVariantFactory({ stockQuantity: 10 }).plainObject;
    const productVariantEntity = new ProductVariantEntity(productVariant);
    expect(productVariantEntity.plainObject).toMatchObject({
      id: productVariant.id,
      type: productVariant.type,
      description: productVariant.description,
      image: productVariant.image,
      stockQuantity: productVariant.stockQuantity,
    });
  });

  it("should create a product variant entity with default values", () => {
    const productVariant = makeProductVariantFactory({
      id: undefined,
      stockQuantity: undefined,
    }).plainObject;
    const productVariantEntity = new ProductVariantEntity(productVariant);
    expect(productVariantEntity.plainObject).toMatchObject({
      id: productVariant.id,
      stockQuantity: productVariant.stockQuantity,
    });
  });

  it("should decrease the stock quantity", () => {
    const productVariant = makeProductVariantFactory({ stockQuantity: 10 }).plainObject;
    const productVariantEntity = new ProductVariantEntity(productVariant);
    productVariantEntity.decreaseStockQuantity();
    expect(productVariantEntity.plainObject.stockQuantity).toBe(9);
  });

  it("should throw an error if the id are invalid", () => {
    expect(
      () => new ProductVariantEntity(makeProductVariantFactory({ id: "invalid-id" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variant type is empty", () => {
    expect(
      () => new ProductVariantEntity(makeProductVariantFactory({ type: undefined }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variant description is empty", () => {
    expect(
      () => new ProductVariantEntity(makeProductVariantFactory({ description: "" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variant image are invalid", () => {
    expect(
      () =>
        new ProductVariantEntity(makeProductVariantFactory({ image: "invalid-image" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variant stock quantity is less than 0", () => {
    expect(
      () => new ProductVariantEntity(makeProductVariantFactory({ stockQuantity: -1 }).plainObject)
    ).toThrowError();
  });
});
