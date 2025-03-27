export function basicAuthMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
    return res.status(401).send({ error: "No credentials sent!" });
  }

  const [username, password] = Buffer.from(auth.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (username === "admin" && password === "password") {
    return next();
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="Secure Area"');
  return res.status(403).send({ error: "Invalid credentials!" });
}
