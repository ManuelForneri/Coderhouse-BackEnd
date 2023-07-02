import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./config.js";
import { cartRouter } from "./routes/cart.routes.js";
import { home } from "./routes/home.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { realTimeChat } from "./routes/realtimechat.routes.js";
import { realTimeProducts } from "./routes/realtimeproducts.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";
import { usersHtmlRouter } from "./routes/users.html.routes.js";
import { usersRouter } from "./routes/users.routes.js";
import { connectMongo } from "./utils/dbConnection.js";
import { connectSocketServer } from "./utils/socketServer.js";
//import { cookiesRouter } from "./routes/cookies.routes.js";
//import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import FileStore from "session-file-store";

const app = express();
const port = 8080;
const fileStore = FileStore(session);

connectMongo();
//app.use(cookieParser());
app.use(
  session({
    secret: "un-re-secreto",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://manuelforneri:120110keko@elabuelotessoredb.pj5hwdc.mongodb.net/?retryWrites=true&w=majority",
      dbName: "ecommerce",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
  })
);

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

app.use("/home", home);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", usersRouter);
app.use("/html/users", usersHtmlRouter);
app.use("/realtimeproducts", realTimeProducts);
app.use("/chat", realTimeChat);
//app.use("/cookie", cookiesRouter);
app.use("/api/sessions/", sessionsRouter);
app.use("/", sessionsRouter);

app.get("/session", (req, res) => {
  console.log(req.session);
  if (req.session.cont) {
    req.session.cont++;
    res.send(JSON.stringify(req.session));
  } else {
    req.session.cont = 1;
    req.session.name = "manuel";
    req.session.lastSearch = "hyperx-cloud-fligth";

    res.send(JSON.stringify(req.session));
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout ERROR", body: err });
    }
    res.send("Logout ok!");
  });
});
app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "manuel" || password !== "manuelpass") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = false;
  res.send("login success!");
});
function auth(req, res, next) {
  if (req.session.user) {
    return next();
  }
  return res.status(401).send("error de autorización!");
}

app.get("/abierta", (req, res) => {
  res.send("Data abierta al publico!");
});

app.get("/api/sessions/login", (req, res) => {
  res.render("login");
});

app.post("/api/sessions/login", (req, res) => {
  const { email, password } = req.body;
  const exist = users.find((u) => u.email === email && u.password === password);
  if (exist) {
    res.redirect("/perfil");
  } else {
    res.send("error revise sus datos");
  }
});

app.get("/api/sessions/register", (req, res) => {
  res.render("register");
});

app.post("/api/sessions/register", (req, res) => {
  const { user, email, password } = req.body;
  const exist = users.find((u) => u.email === email);
  if (exist) {
    res.send("error mail ya registrado");
  } else {
    users.push({ user, email, password });
  }
  res.redirect("/api/sessions/login");
});

app.get("/perfil", auth, (req, res) => {
  if (req.session && req.session.user) {
    res.send("Mostrando todo el perfil!");
  } else {
    res.send("Logueate para ver la informacion del perfil");
  }
});

app.use("/", (req, res) => {
  return res.render("index");
});
app.get("*", (req, res) => {
  return res.status(404).send("not found");
});
