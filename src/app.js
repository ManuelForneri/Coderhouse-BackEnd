import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { testPlantillaProducts } from "./routes/test-plantilla-products.routes.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});

//TODOS MIS ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/test-plantilla-products", testPlantillaProducts);

app.get("*", (req, res) => {});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
