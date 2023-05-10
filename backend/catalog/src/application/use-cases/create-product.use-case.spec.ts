import { makeProductFactory } from "../../core/tests/factories/make-product.factory";
import { CreateProductUseCase } from "./create-product.use-case";
import { ProductRepository } from "../repositories/product.repository";
import { InMemoryProductRepository } from "../../core/tests/repositories/in-memory-product.repository";

describe("CreateProductUseCase", () => {
  let productRepository: ProductRepository;
  let createProductUseCase: CreateProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  it("should register a new product", async () => {
    const product = makeProductFactory().plainObject;
    await createProductUseCase.execute(product);
    const registeredProduct = await productRepository.getProductById(product.id);
    expect(registeredProduct).toMatchObject(product);
  });
});
