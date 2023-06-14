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
    ).lean();
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
    )
      .limit(limit)
      .lean();
    return products;
  }
  async getProductById(pid) {
    const producById = await ProductModel.findOne(
      { _id: pid },
      {
        __v: false,
      }
    );
    return producById;
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

  async update(id, title, description, price, thumbnail, code, stock) {
    const userUptaded = await ProductModel.updateOne(
      { _id: id },
      { title, description, price, thumbnail, code, stock }
    );
    return userUptaded;
  }
}
export const PServives = new productServives();
