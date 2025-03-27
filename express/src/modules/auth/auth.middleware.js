import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const user = jwt.verify(token.split(" ")[1], "secret");
    console.log("Auth middleware", user);
    req.user = user;
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
    return;
  }

  next();
}
