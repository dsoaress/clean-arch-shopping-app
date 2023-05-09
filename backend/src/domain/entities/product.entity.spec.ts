import { ProductEntity } from "./product.entity";
import { makeProductFactory } from "../../core/tests/factories/make-product.factory";

describe("ProductEntity", () => {
  it("should create a product entity", () => {
    const product = makeProductFactory().plainObject;
    const productEntity = new ProductEntity(product);
    expect(productEntity.plainObject).toMatchObject({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      description: product.description,
      images: product.images,
      variants: [
        {
          id: product.variants[0].id,
          type: product.variants[0].type,
          description: product.variants[0].description,
          image: product.variants[0].image,
          stockQuantity: product.variants[0].stockQuantity,
        },
      ],
      dimensions: {
        width: product.dimensions.width,
        height: product.dimensions.height,
        depth: product.dimensions.depth,
        length: product.dimensions.length,
      },
    });
  });

  it("should throw an error if the id are invalid", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ id: "invalid-id" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product name is empty", () => {
    expect(() => new ProductEntity(makeProductFactory({ name: "" }).plainObject)).toThrowError();
  });

  it("should throw an error if the product price is less than 0", () => {
    expect(() => new ProductEntity(makeProductFactory({ price: -1 }).plainObject)).toThrowError();
  });

  it("should throw an error if the product currency is empty", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ currency: "" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product description is empty", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ description: "" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product image are invalid", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ images: ["invalid-image"] }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variants are invalid", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ variants: undefined }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product variant does not exists", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ variants: [] }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the product dimensions are invalid", () => {
    expect(
      () =>
        new ProductEntity(
          makeProductFactory({
            dimensions: { width: 0, height: 0, depth: 0, length: 0 },
          }).plainObject
        )
    ).toThrowError();
  });
});
