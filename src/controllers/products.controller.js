import { PServices } from "../services/products.service.js";

class ProductsController {
  getAll = (req, res) => {
    try {
      const queryParams = req.query;
      console.log(queryParams);
      const response = PServices.getAll(queryParams);

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.render("error");
    }
  };
  getProductById = (req, res) => {
    try {
      const { id } = req.params;
      const productFound = PServices.getProductById(id);

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
  };
  createProduct = (req, res) => {
    try {
      const { title, description, price, thumbnail, code, stock } = req.body;

      const productCreated = PServices.createProduct({
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
  };
  updateProduct = (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, thumbnail, code, stock } = req.body;
      try {
        const productUptaded = PServices.updateProduct(
          id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
        );
        if (productUptaded.matchedCount > 0) {
          return res.status(201).json({
            status: "success",
            msg: "product update",
            payload: {},
          });
        } else {
          return res.status(404).json({
            status: "error",
            msg: "product not found",
            payload: {},
          });
        }
      } catch (e) {
        return res.status(500).json({
          status: "error",
          msg: "db server error while updating product",
          payload: {},
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
  deleteProduct = (req, res) => {
    try {
      const { id } = req.params;
      const result = PServices.deleteProduct(id);
      if (result?.deletedCount > 0) {
        return res.status(200).json({
          status: "success",
          msg: "product deleted",
          payload: {},
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "product not found",
          payload: {},
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        status: "error",
        msg: "something went wrong :(",
        payload: {},
      });
    }
  };
}
export const productsController = new ProductsController();