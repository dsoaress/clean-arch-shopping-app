import { makeProductFactory } from "../../core/tests/factories/make-product.factory";
import { GetProductsUseCase } from "./get-products.use-case";
import { ProductRepository } from "../repositories/product.repository";
import { InMemoryProductRepository } from "../../core/tests/repositories/in-memory-product.repository";

describe("GetProductsUseCase", () => {
  let productRepository: ProductRepository;
  let getProductsUseCase: GetProductsUseCase;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    getProductsUseCase = new GetProductsUseCase(productRepository);
  });

  it("should return all products", async () => {
    const product = makeProductFactory();
    await productRepository.createProduct(product);
    const registeredProducts = await getProductsUseCase.execute();
    expect(registeredProducts).toMatchObject(expect.arrayContaining([product]));
  });
});
