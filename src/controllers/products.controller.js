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
}
export const productsController = new ProductsController();
