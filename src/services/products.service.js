import { ProductModel } from "../DAO/models/products.model.js";

class productServives {
  async getAll(queryParams) {
    const { limit = 10, page = 1, sort, category, stock } = queryParams;
    console.log(queryParams);
    const filter = {};
    let result = await ProductModel.paginate(
      {},
      { limit: limit, page: page, sort: sort, category: category, stock: stock }
    );
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
          ? `http://localhost:8080?page=${result.prevPage}`
          : null,
        nextPageURL: result.nextPage
          ? `http://localhost:8080?page=${result.nextPage}`
          : null,
        prevPageApi: result.prevPage
          ? `http://localhost:8080/api/products?page=${result.prevPage}`
          : null,
        nextPageApi: result.nextPage
          ? `http://localhost:8080/api/products?page=${result.nextPage}`
          : null,
      },
    };
    if (limit) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `&limit=${limit}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&limit=${limit}`;
      }
    }
    if (category) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `category=${category}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `category=${category}`;
      }
      response.payload.products = response.payload.products.find({
        category: category,
      });
    }

    if (stock) {
      if (response.payload.prevPageURL) {
        response.payload.prevPageURL += `&stock=${stock}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&stock=${stock}`;
      }
      response.payload.products = response.payload.products.find({
        stock: stock,
      });
    }
    if (sort) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `&sort=${sort}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&sort=${sort}`;
      }
      if (sort == "des") {
        response.payload.products = response.payload.products.sort(
          (a, b) => a.price - b.price
        );
      } else if (sort == "asc") {
        response.payload.products = response.payload.products.sort(
          (a, b) => b.price - a.price
        );
      }
    }
    return response;
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
