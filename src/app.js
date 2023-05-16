import express from "express";
import { productsRouter } from "./routes/products.routes.js";

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});

//TODOS MIS ENDPOINTS
app.use("/products", productsRouter);

app.get("*", (req, res) => {});
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
