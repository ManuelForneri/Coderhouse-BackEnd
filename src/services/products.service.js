import { ProductModel } from "../DAO/models/mongoose/products.mongoose.js";

class productServices {
  async getAll(queryParams) {
    const response = await ProductModel.getAll(queryParams);
    return response;
  }

  async getProductById(pid) {
    const producById = await ProductModel.getProductById(pid);

    return producById;
  }
  async getProductRealTime() {
    const products = await ProductModel.find(
      {},
      {
        __v: false,
      }
    );

    return products;
  }

  async create({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const productCreated = await ProductModel.create({
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

  async delete(id) {
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
  }

  async update(id, title, description, price, thumbnail, code, stock) {
    const userUptaded = await ProductModel.updateOne(
      { _id: id },
      { title, description, price, thumbnail, code, stock }
    );
    return userUptaded;
  }
}
export const PServices = new productServices();
