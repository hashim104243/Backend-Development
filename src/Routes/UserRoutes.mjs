import { Router } from "express";
import {
  query,
  body,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchcema } from "../utils/ValidationSchcema.mjs";

import user from "../utils/constant.mjs";
import resolveIndexUserID from "../utils/middleware.mjs";
const router = Router();

router.get(
  "/api/user",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("must at least 3-10 character"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    console.log(req.session);
    console.log(req.session.id);
    req.sessionStore.get(req.session.id, (error, sessionData) => {
      if (error) {
        console.log(error);
        throw error();
      }
      console.log("ssssssssssssssss", sessionData);
    });

    // console.log(req["express-validator#contexts"]);
    const {
      query: { filter, value },
    } = req;

    if (filter && value) {
      return res.send(user.filter((user) => user[filter].includes(value)));
    }
    return res.send(user);
  }
);

router.get("/api/user/:id", resolveIndexUserID, (req, res) => {
  const { findIndex } = req;
  const findId = user[findIndex];
  console.log("get user by id ", req.session);
  console.log("get user by id ", req.session.id);

  if (!findId) return sendStatus(404);
  return res.send(findId);
});

router.post(
  "/api/user",
  checkSchema(createUserValidationSchcema),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty()) res.status(400).send({ error: result.array() });
    const data = matchedData(req);
    console.log(data);

    // const { body } = req;
    const newUser = { id: user[user.length - 1].id + 1, ...data };
    user.push(newUser);
    console.log(req.body);
    res.status(201).send(newUser);
  }
);

// put method
router.put("/api/user/:id", resolveIndexUserID, (req, res) => {
  const { body, findIndex } = req;

  user[findIndex] = { id: user[findIndex].id, ...body };
  return res.sendStatus(200);
});

// patch method
router.patch("/api/user/:id", resolveIndexUserID, (req, res) => {
  const { body, findIndex } = req;

  user[findIndex] = { ...user[findIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/user/:id", resolveIndexUserID, (req, res) => {
  const { findIndex } = req;

  user.splice(findIndex, 1);
  res.sendStatus(200);
});
export default router;
