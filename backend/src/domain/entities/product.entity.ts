import { randomUUID } from "node:crypto";
import { StockEntity } from "./stock.entity";
import { validateUUID } from "../../core/utils/validate-uuid";

interface Dimensions {
  length: number;
  width: number;
  depth: number;
  height: number;
}

export interface ProductEntityInputProps {
  id?: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  image?: string;
  dimensions: Dimensions;
  stockId?: string;
  stock?: StockEntity;
}

interface ProductEntityOutputProps extends ProductEntityInputProps {
  id: string;
}

export class ProductEntity {
  protected readonly _id: string;
  protected readonly _name: string;
  protected readonly _price: number;
  protected readonly _currency: string;
  protected readonly _description: string;
  protected readonly _image?: string;
  protected readonly _dimensions: Dimensions;
  protected readonly _stockId?: string;
  protected readonly _stock?: StockEntity;

  constructor(props: ProductEntityInputProps) {
    ProductEntity.validate(props);
    this._id = props.id || randomUUID();
    this._name = props.name;
    this._price = props.price;
    this._currency = props.currency;
    this._description = props.description;
    this._image = props.image;
    this._dimensions = props.dimensions;
    this._stockId = props.stockId;
    this._stock = props.stock;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get currency(): string {
    return this._currency;
  }

  public get description(): string {
    return this._description;
  }

  public get image(): string | undefined {
    return this._image;
  }

  public get dimensions(): Dimensions {
    return this._dimensions;
  }

  public get stockId(): string | undefined {
    return this._stockId;
  }

  public get stock(): StockEntity | undefined {
    return this._stock;
  }

  public get plainObject(): ProductEntityOutputProps {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      currency: this.currency,
      description: this.description,
      image: this.image,
      dimensions: this.dimensions,
      stockId: this.stockId,
      stock: this.stock,
    };
  }

  private static validate(props: ProductEntityInputProps): void {
    const errors: string[] = [];
    const { name, price, currency, description, image, dimensions, stockId } = props;
    if (!this.validateName(name)) errors.push("invalid name: must be at least 3 characters");
    if (!this.validatePrice(price)) errors.push("invalid price: must be greater than 0");
    if (!this.validateCurrency(currency)) errors.push("invalid currency: must be 3 characters");
    if (!this.validateDescription(description))
      errors.push("invalid description: must be at least 10 characters");
    if (!this.validateImage(image)) errors.push("invalid image: must be at least 10 characters");
    if (!this.validateDimensions(dimensions))
      errors.push("invalid dimensions: values must be greater than 0");
    if (stockId && !validateUUID(stockId)) errors.push("invalid stockId: must be a valid UUID");
    if (errors.length > 0) throw new Error(errors.join("; "));
  }

  private static validateName(name: string): boolean {
    return name.length > 3;
  }

  private static validatePrice(price: number): boolean {
    return price > 0;
  }

  private static validateCurrency(currency: string): boolean {
    return currency.length === 3;
  }

  private static validateDescription(description: string): boolean {
    return description.length > 10;
  }

  private static validateImage(image?: string): boolean {
    if (!image) return true;
    return image.includes("https://");
  }

  private static validateDimensions(dimensions: Dimensions): boolean {
    return (
      dimensions.length > 0 && dimensions.width > 0 && dimensions.depth > 0 && dimensions.height > 0
    );
  }
}
