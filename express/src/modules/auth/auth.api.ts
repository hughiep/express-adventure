import express from "express";
import session from "express-session";
import { userRegisterSchema } from "./auth.schemas.js";
import { redisStore } from "../../libs/redis.js";

const sessionAuth = session({
  secret: "my-secret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: "auto" },
  store: redisStore,
});

export const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const { email, name, password } = userRegisterSchema.parse(req.body);

  return res.status(200).json({ status: "success" });
});

// authRouter.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   if (username === "admin" && password === "admin") {
//     req.session.user = { name: "admin" };
//     return res.status(200).json({ status: "success" });
//   }

//   return res.status(401).json({ status: "error" });
// });

// authRouter.get("/set-session", (req, res) => {
//   req.session.user = { name: "admin" };
//   return res.status(200).json({ status: "success" });
// });

// authRouter.get("/get-session", (req, res) => {
//   return res.status(200).json({ user: req.session.user });
// });

// authRouter.get("/destroy-session", (req, res) => {
//   req.session.destroy(function (err) {
//     if (err) {
//       return res.status(500).json({ status: "error" });
//     }

//     res.clearCookie("connect.sid", { path: "/" });
//     return res.status(200).json({ status: "success" });
//   });
// });
