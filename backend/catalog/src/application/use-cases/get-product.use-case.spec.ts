import { makeProductFactory } from "../../core/tests/factories/make-product.factory";
import { GetProductUseCase } from "./get-product.use-case";
import { ProductRepository } from "../repositories/product.repository";
import { InMemoryProductRepository } from "../../core/tests/repositories/in-memory-product.repository";

describe("GetProductUseCase", () => {
  let productRepository: ProductRepository;
  let getProductUseCase: GetProductUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    getProductUseCase = new GetProductUseCase(productRepository);
  });

  it("should return a product", async () => {
    const product = makeProductFactory();
    await productRepository.createProduct(product);
    const registeredProduct = await getProductUseCase.execute(product.id);
    expect(registeredProduct).toMatchObject(product);
  });

  it("should return null if product does not exist", async () => {
    const registeredProduct = await getProductUseCase.execute("non-existing-id");
    expect(registeredProduct).toBeNull();
  });
});
