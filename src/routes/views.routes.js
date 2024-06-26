import { Router } from "express";
import { CServices } from "../services/carts.service.js";
import { PServices } from "../services/products.service.js";
import { userController } from "../controllers/users.controller.js";
import UsersDTO from "../controllers/DTO/users.DTO.js";
import CustomError from "../services/errors/custom-error.js";
import EError from "../services/errors/enums.js";
import { generateProduct } from "../utils/productFaker.js";
export const viewsRouter = Router();

viewsRouter.get("/user-cart", async (req, res) => {
  try {
    let { _id } = req.session.user;
    let userFound = await userController.getUserById(_id);
    const cartFound = await CServices.getCartById(userFound.cid);
    const plainCart = cartFound.products.map((doc) => doc.toObject());

    return res.render("cart", { plainCart, cid: cartFound._id.toString() });
  } catch (e) {
    let data = {
      title: "Error inesperado",
      text: "intentelo otra vez",
    };
    return res.render("error", data);
  }
});
viewsRouter.get("/product-details/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const cid = req.session.user.cid;

    const productFound = await PServices.getProductById(pid);
    const plainProduct = {
      _id: productFound._id.toString(),
      title: productFound.title,
      description: productFound.description,
      price: productFound.price,
      thumbnail: productFound.thumbnail,
      code: productFound.code,
      stock: productFound.stock,
      category: productFound.category,
      cid: cid,
    };
    return res.render("product-detail", { plainProduct });
  } catch (e) {
    let data = {
      title: "Error inesperado",
      text: "intentelo otra vez",
    };
    return res.render("error", data);
  }
});
viewsRouter.get("/current", async (req, res) => {
  let user = req.session.user;
  let userDto = new UsersDTO(user);
  res.send({ message: "user", payload: userDto });
});

viewsRouter.get("/mockingproducts", async (req, res) => {
  try {
    const products = [];

    for (let i = 0; i < 100; i++) {
      products.push(generateProduct());
    }
    res.send({ status: "success", payload: products });
  } catch (e) {
    CustomError.createError({
      name: "error-mockingproducts",
      cause: "No se pudieron crear los 100 productos",
      message: "Intentelo otra vez, si el error persiste lo solucionaremos",
      code: EError.ADD_PRODUCT_ERROR,
    });
  }
});

viewsRouter.get("/", (req, res) => {
  return res.redirect("/login");
});
