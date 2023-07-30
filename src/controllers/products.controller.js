import { PServices } from "../services/products.service";

class ProductsController {
  async getAll(res, req) {
    try {
      const queryParams = req.query;
      const response = await PServices.getAll(queryParams);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.render("error");
    }
  }
  async getProductById(res, req) {
    try {
      const { id } = req.params;
      const productFound = await PServices.getProductById(id);

      if (productFound) {
        return res.status(201).json({
          status: "success",
          msg: "Product found",
          payload: productFound,
        });
      } else {
        return res.status(400).json({
          status: "error",
          msg: "The indicated product was not found",
        });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ status: "error", msg: "Internal Server Error" });
    }
  }
  async createProduct(res, req) {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;

      const productCreated = await PServices.createProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });

      return res.status(201).json({
        status: "success",
        msg: "product created",
        payload: {
          id: productCreated._id,
          title: productCreated.title,
          description: productCreated.description,
          price: productCreated.price,
          thumbnail: productCreated.thumbnail,
          code: productCreated.code,
          stock: productCreated.stock,
        },
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  }
}
export const productsController = new ProductsController();
