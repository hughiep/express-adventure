import express from "express";

const proxyServer = express();



proxyServer.get("/", (req, res) => {
  res.send("Hello World");
});

