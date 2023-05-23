import express from "express";
import handlebars from "express-handlebars";
import { cartRouter } from "./routes/cart.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { testPlantillaProducts } from "./routes/test-plantilla-products.routes.js";
import { __dirname } from "./utils.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));

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
