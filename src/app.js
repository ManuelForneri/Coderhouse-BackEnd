import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { cartRouter } from "./routes/cart.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { testPlantillaProducts } from "./routes/test-plantilla-products.routes.js";
import { testSocketRouter } from "./routes/test-sockets.routes.js";
import { __dirname } from "./utils.js";

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

//BACK MANDA MENSAJES AL FRONT
socketServer.on("connection", (socket) => {
  setInterval(() => {
    socket.emit("msg_back_front", {
      msg: "hola mundo desde el back " + Date.now(),
      from: "Server",
    });
  }, 5000);

  //BACK ATAJA MENSAJES DEL FRONT
  socket.on("msg_front_back", (msg) => {
    console.log(msg);
  });
});

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});

//TODOS MIS ENDPOINTS
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
//ENDPOINTS CON PLANTILLAS DE HANDLEBARS
app.use("/test-plantilla-products", testPlantillaProducts);
app.use("/test-socket", testSocketRouter);
app.get("*", (req, res) => {});
