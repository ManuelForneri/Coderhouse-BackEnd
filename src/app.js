//@ts-check
import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.routes.js";
import { home } from "./routes/home.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { usersHtmlRouter } from "./routes/users.html.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";

const app = express();
const port = 8080;

connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//config del motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
connectSocketServer(httpServer);

app.use("/", home);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);

app.use("/html/users", usersHtmlRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/chat", realTimeChat);

app.get("*", (req, res) => {
  return res.status(404).send("not found");
});
