import { Server } from "socket.io";
import { ProductManager } from "../DAO/ProductManager.js";
import { MessageModel } from "../DAO/models/messages.model.js";

const ProductM = new ProductManager();

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on("connection", (socket) => {
    socket.on("msg_front_to_back", async (msg) => {
      try {
        await MessageModel.create(msg);
      } catch (e) {
        console.log(e);
      }

      try {
        const msgs = await MessageModel.find({});
        socketServer.emit("new_msgs", msgs);
      } catch (e) {
        console.log(e);
      }
    });
  });
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
}
