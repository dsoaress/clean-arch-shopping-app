import { randomUUID } from "node:crypto";
import { validateUUID } from "../../core/utils/validate-uuid";

export interface StockEntityInputProps {
  id?: string;
  productId: string;
  quantity: number;
}

interface StockEntityOutputProps extends StockEntityInputProps {
  id: string;
}

export class StockEntity {
  protected readonly _id: string;
  protected readonly _productId: string;
  protected _quantity: number;

  constructor(props: StockEntityInputProps) {
    StockEntity.validate(props);
    this._id = props.id || randomUUID();
    this._productId = props.productId;
    this._quantity = props.quantity;
  }

  public get id(): string {
    return this._id;
  }

  public get productId(): string {
    return this._productId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get plainObject(): StockEntityOutputProps {
    return {
      id: this.id,
      productId: this.productId,
      quantity: this.quantity,
    };
  }

  public decreaseQuantity(): void {
    this._quantity--;
  }

  public static validate({ productId, quantity }: StockEntityInputProps): void {
    const errors: string[] = [];
    if (!validateUUID(productId)) errors.push("invalid productId: must be a valid uuid");
    if (!this.validateQuantity(quantity))
      errors.push("invalid quantity: must be a positive number");
    if (errors.length) throw new Error(errors.join("; "));
  }

  private static validateQuantity(quantity: number): boolean {
    return quantity >= 0;
  }
}
