import { Server } from "socket.io";

import { ProductManager } from "../ProductManager.js";
const ProductM = new ProductManager();

export function connectSocketServer(httpServer) {
  const socketServer = new Server(httpServer);

  let msgs = [];
  socketServer.on("connection", (socket) => {
    socket.on("msg_front_to_back", (msg) => {
      msgs.push(msg);
      console.log(msg);
      socketServer.emit("new_msgs", msgs);
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
