import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { errorMiddleware } from "./shared/errors";
import { authRouter } from "./modules/auth/auth.api";
import jwt from "jsonwebtoken";

dotenv.config();
import "reflect-metadata";
import { getAccessToken, requestGetAuthCode } from "./libs/oauth";

// const router = express.Router();

// create a file
// router.post("/create", async (req, res) => {
//   console.log(req.body);
//   await appendFile(req.body.name, req.body.content);
//   res.send("Create a file");
// });

// router.delete("/delete/:name", async (req, res) => {
//   try {
//     // delete a file using fs module
//     unlink(req.params.name);

//     console.log(req.params.name);
//     res.send("Delete a file");
//   } catch (error) {
//     res.send("File not found");
//   }
// });

// router.post("/login", (req, res) => {
//   console.log(req.body);
//   const token = jwt.sign(req.body, "secret", {
//     expiresIn: "2 days",
//   });
//   res.send(token);
// });

// router.use(authMiddleware);

// router.get("/read/:name", async (req, res) => {
//   const content = await readFile(req.params.name);
//   res.send(content);
// });

export function main() {
  const app = express();
  app.use(bodyParser.json());

  app.get("/ping", (_, res) => {
    res.send("pong");
  });

  // Auth
  app.get("/auth", (req, res) => {
    res.redirect(requestGetAuthCode);
  });

  app.get(process.env.OAUTH_REDIRECT_URI!, async (req, res) => {
    // ! get authorization token from request parameter
    const authorizationCode = req.query.code;
    // const response = await getAccessToken(authorizationCode as string);
    // console.log(response);
    // if (response.ok) {
    //   const data = await response.json();
    //   res.send(data);
    // }
  });

  app.use("/api", authRouter);
  // Order matters
  // app.use(errorMiddleware);

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

main();
