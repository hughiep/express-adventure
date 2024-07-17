import express from "express";
import bodyParser from "body-parser";
import { appDataSource } from "./db/data-source";
import dotenv from "dotenv";
import { errorMiddleware } from "./shared/errors";
import { authRouter } from "./modules/auth/auth.api";

dotenv.config();
import "reflect-metadata";

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

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.use("/api", authRouter);
  // Order matters
  app.use(errorMiddleware);

  appDataSource.initialize().then(() => {
    console.log("Database connected");
  });

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
}

main();
