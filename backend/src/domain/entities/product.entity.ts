import { randomUUID } from "node:crypto";
import { validateUUID } from "../../core/utils/validate-uuid";
import { ProductVariantEntity } from "./product-variant.entity";

export class ProductEntity {
  protected readonly _id: string;
  protected readonly _name: string;
  protected readonly _price: number;
  protected readonly _currency: string;
  protected readonly _description: string;
  protected readonly _images: string[];
  protected readonly _variants: ProductVariantEntity[];
  protected readonly _dimensions: Dimensions;

  constructor(props: ProductEntityInputProps) {
    ProductEntity.validate(props);
    this._id = props.id || randomUUID();
    this._name = props.name;
    this._price = props.price;
    this._currency = props.currency;
    this._description = props.description;
    this._images = props.images;
    this._variants = props.variants;
    this._dimensions = props.dimensions;
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

  public get images(): string[] {
    return this._images;
  }

  public get variants(): ProductVariantEntity[] {
    return this._variants;
  }

  public get dimensions(): Dimensions {
    return this._dimensions;
  }

  public get plainObject(): ProductEntityOutputProps {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      currency: this.currency,
      description: this.description,
      variants: this.variants,
      images: this.images,
      dimensions: this.dimensions,
    };
  }

  private static validate(props: ProductEntityInputProps): void {
    const errors: string[] = [];
    const { id, name, price, currency, description, images, variants, dimensions } = props;
    if (id && !validateUUID(id)) errors.push("invalid id: must be a valid uuid");
    if (!this.validateName(name)) errors.push("invalid name: must be at least 3 characters");
    if (!this.validatePrice(price)) errors.push("invalid price: must be greater than 0");
    if (!this.validateCurrency(currency)) errors.push("invalid currency: must be 3 characters");
    if (!this.validateDescription(description))
      errors.push("invalid description: must be at least 10 characters");
    if (!this.validateImages(images)) errors.push("invalid images: must be a valid url");
    if (!this.validateVariants(variants)) errors.push("invalid variants: must be at least 1");
    if (!this.validateDimensions(dimensions))
      errors.push("invalid dimensions: values must be greater than 0");
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

  private static validateImages(images: string[]): boolean {
    return images?.every((image) => image.startsWith("https://"));
  }

  private static validateVariants(variants: Variant[]): boolean {
    if (!variants) return false;
    return !!variants.length;
  }

  private static validateDimensions(dimensions: Dimensions): boolean {
    return (
      dimensions.length > 0 && dimensions.width > 0 && dimensions.depth > 0 && dimensions.height > 0
    );
  }
}

interface Variant {
  id: string;
  type: "COLOR" | "STORAGE_SIZE";
  description: string;
  image: string;
  stockQuantity: number;
}

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
  images: string[];
  variants: ProductVariantEntity[];
  dimensions: Dimensions;
}

interface ProductEntityOutputProps extends ProductEntityInputProps {
  id: string;
}
