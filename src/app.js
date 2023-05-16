import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartRouter } from "./routes/cart.routes.js";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});

//TODOS MIS ENDPOINTS
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

app.get("*", (req, res) => {});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
