import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { authRouter } from "./modules/auth/auth.api";

dotenv.config();
import { getAccessToken, requestGetAuthCode } from "./libs/oauth";

export function main() {
  const app = express();
  app.use(bodyParser.json());

  app.get("/ping", (_, res) => {
    res.send("pong");
  });

  // Auth
  app.get("/auth", (req, res) => {
    console.log("auth");
    res.redirect(requestGetAuthCode);
  });

  app.get(process.env.OAUTH_REDIRECT_URI!, async (req, res) => {
    const authorizationCode = req.query.code;
    console.log(authorizationCode);
    const response = await getAccessToken(authorizationCode as string);
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      res.send(data.access_token);
    }
  });

  app.use("/api", authRouter);
  // Order matters
  // app.use(errorMiddleware);

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

main();
