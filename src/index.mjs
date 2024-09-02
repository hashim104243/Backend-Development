import express from "express";
import routes from "./Routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import user from "./utils/constant.mjs";
const app = express();
app.use(express.json());
app.use(cookieParser("hello"));
app.use(
  session({
    secret: "expressjs framwork of nodejs",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`running on PORT ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);

  res.cookie("name", "value", { maxAge: 60000, signed: true });
  res.send([{ name: "ali" }]);
});

app.post("/api/auth", (request, response) => {
  const {
    body: { name, password },
  } = request;

  const findUser = user.find((user) => user.name === name);
  if (!findUser || findUser.password !== password) {
    return res.status(403).send("unauthorized access");
  }

  request.session.user = findUser;
  console.log(request.session.user);

  response.status(200).send(findUser);
});

app.get("/api/auth/status", (request, response) => {
  request.sessionStore.get(request.sessionID, (error, session) => {
    console.log("session is:  hhhhhhhhhh", session);
  });

  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send("user must be authentic");
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) res.sendStatus(401);
  const { body: item } = req;
  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart/status", (req, res) => {
  if (!req.session.user) res.status(401);
  return res.send(request.session.cart ?? []);
});
