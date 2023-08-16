import { productModel } from "../DAO/models/products.model.js";

class productServices {
  async getAll(queryParams) {
    const response = await productModel.getAll(queryParams);
    return response;
  }

  async getProductById(pid) {
    const producById = await productModel.getProductById(pid);

    return producById;
  }
  async getProductRealTime() {
    const products = await productModel.getProductRealTime();

    return products;
  }

  async createProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const productCreated = await productModel.createProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    return productCreated;
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    const userUptaded = await productModel.updateProduct(
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );
    return userUptaded;
  }
  async deleteProduct(id) {
    const result = await productModel.deleteProduct(id);
    return result;
  }
}
export const PServices = new productServices();
