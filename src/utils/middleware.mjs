import user from "./constant.mjs";

const resolveIndexUserID = (req, res, next) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return res.sendStatus(400)("bad request invalid request");
  const findIndex = user.findIndex((items) => items.id === parsedId);
  if (findIndex === -1) return res.sendStatus(404);
  req.findIndex = findIndex;
  next();
};

export default resolveIndexUserID;
