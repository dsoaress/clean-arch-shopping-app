import { randomUUID } from "node:crypto";

import { StockEntity, StockEntityInputProps } from "../../../domain/entities/stock.entity";

export const makeStockFactory = (overrides?: Partial<StockEntityInputProps>): StockEntity => {
  return new StockEntity({
    productId: randomUUID(),
    quantity: 100,
    ...overrides,
  });
};
