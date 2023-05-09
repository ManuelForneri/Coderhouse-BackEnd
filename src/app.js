const express = require("express");
/* importando el productManager*/
const ProductManager = require("./ProductManager.js");
const app = express();
const port = 8080;

const ProductM = new ProductManager();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos");
});
app.get("/products", (req, res) => {
  let products = ProductM.getProducts();
  const query = req.query;
  console.log(query);
  limit = parseInt(query.limit);
  if (!!limit) {
    let prodLimits = [];
    for (let i = 0; i < limit; i++) {
      prodLimits.push(products[i]);
    }
    res.json(prodLimits);
  } else {
    res.json(products);
  }

  /*const productSerched = products.find((p) => p.id == id);
  res.json(productSerched);*/
});
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  let products = ProductM.getProducts();
  const productSerched = products.find((p) => p.id == id);
  if (!!productSerched) {
    res.json(productSerched);
  } else {
    res.json({
      msg: "Ese Producto no existe ",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
