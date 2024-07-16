import express from "express";
import bodyParser from "body-parser";
import { appendFile, readFile, unlink } from "node:fs/promises";
import jwt from "jsonwebtoken";
import { authMiddleware } from "./modules/auth/auth.middleware.js";
import { appDataSource } from "./db/data-source.js";
import dotenv from "dotenv";

dotenv.config();

import "reflect-metadata";

appDataSource.initialize().then(() => {
  console.log("Database connected");
});

const router = express.Router();

// create a file
router.post("/create", async (req, res) => {
  console.log(req.body);
  await appendFile(req.body.name, req.body.content);
  res.send("Create a file");
});

router.delete("/delete/:name", async (req, res) => {
  try {
    // delete a file using fs module
    unlink(req.params.name);

    console.log(req.params.name);
    res.send("Delete a file");
  } catch (error) {
    res.send("File not found");
  }
});

router.post("/login", (req, res) => {
  console.log(req.body);
  const token = jwt.sign(req.body, "secret", {
    expiresIn: "2 days",
  });
  res.send(token);
});

router.use(authMiddleware);

router.get("/read/:name", async (req, res) => {
  const content = await readFile(req.params.name);
  res.send(content);
});

function initApp() {
  const app = express();
  app.use(bodyParser.json());

  app.get("/ping", (req, res) => {
    res.send("pong");
  });
  app.use("/api", router);

  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });

  return app;
}

export function main() {
  initApp();
}

main();
