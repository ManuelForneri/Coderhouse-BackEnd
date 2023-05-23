const socket = io();

//FRONT MANDA MENSAJES AL BACK
setInterval(() => {
  socket.emit("msg_front_back", {
    msg: "hola mundo desde el front " + Date.now(),
    from: "Usuario Anonimo",
  });
}, 5000);

//FRONT ATAJA LOS MENSAJES DEL BACK
socket.on("msg_back_front", (msg) => {
  console.log(msg);
});
