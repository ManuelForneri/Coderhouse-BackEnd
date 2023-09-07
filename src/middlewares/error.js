import EError from "../services/errors/enums.js";

export default (error, req, res, next) => {
  switch (error.code) {
    case EError.ADD_PRODUCT_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EError.ADD_PRODUCT_IN_CART:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EError.DATABASE_ERRRO:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EError.LOGIN_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    case EError.REGISTER_ERROR:
      res
        .status(400)
        .send({ status: "error", error: error.name, cause: error.cause });
      break;
    default:
      res.send({ status: "error", error: "Unhandle error" });
      break;
  }
};
