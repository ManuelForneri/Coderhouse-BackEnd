const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});
app.get("/products", (req, res) => {
  res.json({
    name: "Producto 1",
    price: 50,
    description: "dmidjiejdjejdieidiejijded",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
