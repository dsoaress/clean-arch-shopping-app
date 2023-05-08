import { StockEntity } from "./stock.entity";
import { makeStockFactory } from "../../core/tests/factories/make-stock.factory";

describe("StockEntity", () => {
  it("should create a stock entity", () => {
    const stock = makeStockFactory().plainObject;
    const stockEntity = new StockEntity(stock);
    expect(stockEntity.plainObject).toMatchObject({
      id: stock.id,
      productId: stock.productId,
      quantity: stock.quantity,
    });
  });

  it("should decrease the stock quantity", () => {
    const stock = makeStockFactory({ quantity: 2 }).plainObject;
    const stockEntity = new StockEntity(stock);
    stockEntity.decreaseQuantity();
    expect(stockEntity.plainObject.quantity).toBe(stock.quantity - 1);
  });

  it("should throw an error if the stock productId is empty", () => {
    expect(() => new StockEntity(makeStockFactory({ productId: "" }).plainObject)).toThrowError();
  });

  it("should throw an error if the stock productId is invalid", () => {
    expect(
      () => new StockEntity(makeStockFactory({ productId: "invalid-id" }).plainObject)
    ).toThrowError();
  });

  it("should throw an error if the stock quantity is less than 0", () => {
    expect(() => new StockEntity(makeStockFactory({ quantity: -1 }).plainObject)).toThrowError();
  });
});
