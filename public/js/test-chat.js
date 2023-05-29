const socket = io();
const chatBox = document.getElementById("chatBox");
const sendButton = document.getElementById("send-button");

const userName = prompt("Dime tu nombre", "");

chatBox.addEventListener("keyup", ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      msg: chatBox.value,
      user: userName,
    });
    chatBox.value = "";
  }
});

sendButton.addEventListener("click", () => {
  socket.emit("msg_front_to_back", {
    msg: chatBox.value,
    user: userName,
  });
  chatBox.value = "";
  alert("hizo click en enviar");
});
