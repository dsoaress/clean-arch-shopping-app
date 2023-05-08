import { ProductEntity } from "./product.entity";
import { makeProductFactory } from "../../core/tests/factories/make-product.factory";
import { makeStockFactory } from "../../core/tests/factories/make-stock.factory";
import { StockEntity } from "./stock.entity";

describe("ProductEntity", () => {
  it("should create a product entity", () => {
    const stock = makeStockFactory();
    const product = makeProductFactory({ stockId: stock.id, stock }).plainObject;
    const productEntity = new ProductEntity(product);
    expect(productEntity.plainObject).toMatchObject({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      description: product.description,
      image: product.image,
      dimensions: {
        width: product.dimensions.width,
        height: product.dimensions.height,
        depth: product.dimensions.depth,
        length: product.dimensions.length,
      },
      stockId: product.stockId,
    });
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
      () => new ProductEntity(makeProductFactory({ image: "invalid-image" }).plainObject)
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

  it("should throw an error if the product stockId are invalid", () => {
    expect(
      () => new ProductEntity(makeProductFactory({ stockId: "invalid-id" }).plainObject)
    ).toThrowError();
  });
});
