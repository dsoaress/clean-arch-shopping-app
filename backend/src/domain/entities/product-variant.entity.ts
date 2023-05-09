import { randomUUID } from "node:crypto";
import { validateUUID } from "../../core/utils/validate-uuid";

export class ProductVariantEntity {
  protected readonly _id: string;
  protected readonly _type: ProductVariantType;
  protected readonly _description: string;
  protected readonly _image: string;
  protected _stockQuantity: number;

  constructor(props: ProductVariantEntityInputProps) {
    ProductVariantEntity.validate(props);
    this._id = props.id || randomUUID();
    this._type = props.type;
    this._description = props.description;
    this._image = props.image;
    this._stockQuantity = props.stockQuantity ?? 0;
  }

  public get id(): string {
    return this._id;
  }

  public get type(): ProductVariantType {
    return this._type;
  }

  public get description(): string {
    return this._description;
  }

  public get image(): string {
    return this._image;
  }

  public get stockQuantity(): number {
    return this._stockQuantity;
  }

  public get plainObject(): ProductVariantEntityOutputProps {
    return {
      id: this.id,
      type: this.type,
      description: this.description,
      image: this.image,
      stockQuantity: this.stockQuantity,
    };
  }

  public decreaseStockQuantity() {
    this._stockQuantity--;
  }

  private static validate(props: ProductVariantEntityInputProps) {
    const errors: string[] = [];
    const { id, description, image, type, stockQuantity } = props;
    if (id && !validateUUID(id)) errors.push("invalid id: must be a valid uuid");
    if (!this.validateType(type)) errors.push("invalid type: must be 'COLOR' or 'STORAGE_SIZE'");
    if (!this.validateDescription(description))
      errors.push("invalid description: must be at least 10 characters");
    if (!this.validateImage(image)) errors.push("invalid image: must be a valid url");
    if (stockQuantity && !this.validateStockQuantity(stockQuantity))
      errors.push("invalid stockQuantity: values must be equal or greater than 0");
    if (errors.length > 0) throw new Error(errors.join("; "));
  }

  private static validateType(type: ProductVariantType): boolean {
    return type === "COLOR" || type === "STORAGE_SIZE";
  }

  private static validateDescription(description: string): boolean {
    return description.length > 10;
  }

  private static validateImage(image: string): boolean {
    return image.startsWith("https://");
  }

  private static validateStockQuantity(stockQuantity = 0): boolean {
    return stockQuantity >= 0;
  }
}

type ProductVariantType = "COLOR" | "STORAGE_SIZE";

export interface ProductVariantEntityInputProps {
  id?: string;
  type: ProductVariantType;
  description: string;
  image: string;
  stockQuantity?: number;
}

interface ProductVariantEntityOutputProps extends ProductVariantEntityInputProps {
  id: string;
  stockQuantity: number;
}
