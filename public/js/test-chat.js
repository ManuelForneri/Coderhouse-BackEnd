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
});

//front ataja los mensajes
socket.on("new_msgs", (msgs) => {
  const msgsContainer = document.getElementById("chat-msg");
  let formato = "";
  msgs.forEach((msg) => {
    formato = formato + "<p>" + msg.user + " : " + msg.msg + "</p>";
  });
  msgsContainer.innerHTML = formato;
});
