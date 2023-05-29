import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { cartRouter } from "./routes/cart.routes.js";
import { home } from "./routes/home.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { __dirname } from "./utils.js";
import { productsRouter } from "./routes/products.routes.js";
import { ProductManager } from "./ProductManager.js";
const ProductM = new ProductManager();

const app = express();
const port = 8080;

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

const socketServer = new Server(httpServer);

//Recibiendo los datos del nuevo producto
socketServer.on("connection", (socket) => {
  console.log("Cliente conectado " + socket.id);
  socket.on("new-product", async (newProduct) => {
    try {
      ProductM.addProduct(newProduct);
      const newProductsList = ProductM.getProducts();
      socketServer.emit("products", newProductsList);
    } catch (error) {
      console.log(error);
    }
  });
});
let msgs = [];
socketServer.on("connection", (socket) => {
  socket.on("msg_front_to_back", (msg) => {
    msgs.push(msg);
    console.log(msg);
    socketServer.emit("new_msgs", msgs);
  });
});

//TODOS MIS ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

//ENDPOINTS CON PLANTILLAS DE HANDLEBARS
app.use("/", home);
app.use("/realtimeproducts", realTimeProducts);
app.use("/chat", realTimeChat);

app.get("*", (req, res) => {});
