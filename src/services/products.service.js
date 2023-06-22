import { response } from "express";
import { ProductModel } from "../DAO/models/products.model.js";
import { ObjectId } from "mongodb";

class productServives {
  async getAll(queryParams) {
    const { limit = 10, page = 1, sort, query } = queryParams;
    const filter = {};
    let result = await ProductModel.paginate({}, { limit: limit, page: page });
    const products = result.docs;
    const response = {
      status: "success",
      msg: "listado de Productos",
      payload: {
        products: products,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        prevPageURL: result.prevPage
          ? `http://localhost:8080/api/products?limit=${limit}&page=${result.prevPage}`
          : null,
        nextPageURL: result.nextPage
          ? `http://localhost:8080/api/products?limit=${limit}&page=${result.nextPage}`
          : null,
      },
    };
    return response;
  }

  async getProductById(pid) {
    const producById = await ProductModel.findOne(
      { _id: pid },
      {
        __v: false,
      }
    );
    producById._id = ObjectId.toString();
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
