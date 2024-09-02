import { Router } from "express";
const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  req.session.visited = true;
  console.log("sign cooki", req.signedCookies);

  if (req.signedCookies && req.signedCookies.name == "value") {
    res.status(200).send([
      { id: 0, name: "bread", price: 100 },
      { id: 0, name: "bread", price: 100 },
      { id: 0, name: "bread", price: 100 },
    ]);
  }
  res.send("sorry you need corect cookie");
});

export default router;
