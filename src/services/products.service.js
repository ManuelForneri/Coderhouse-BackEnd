import { ProductModel } from "../DAO/models/products.model.js";

class productServives {
  async getAll() {
    const products = await ProductModel.find(
      {},
      {
        _id: true,
        title: true,
        description: true,
        price: true,
        thumbnail: true,
        code: true,
        stock: true,
      }
    );
    return products;
  }
  async getLimit(limit) {
    const products = await ProductModel.find(
      {},
      {
        _id: true,
        title: true,
        description: true,
        price: true,
        thumbnail: true,
        code: true,
        stock: true,
      }
    ).limit(limit);
    return products;
  }

  async create({ title, description, price, thumbnail, code, stock }) {
    const productCreated = await ProductModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return productCreated;
  }

  async delete(id) {
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
  }

  async update(id, firstName, lastName, email) {
    const userUptaded = await ProductModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }
}
export const PServives = new productServives();
