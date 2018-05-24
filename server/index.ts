import express from "express";
import next from "next";

import appRoutes from "../app/routes";
import serverRoutes from "./routes";

import { sequelize as database } from "./db";

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = next({ dir: dev ? "../app" : __dirname + "/../../app", dev });
const appHandler = appRoutes.getRequestHandler(app);

console.log((database as any)
  .authenticate);

Promise.resolve() // @ts-ignore
  .then(() => app.prepare())
  .then(() => {
    const server = express();

    server.use((req, res, next) => {
      if (req.path.substr(0, 3) === "/_/") {
        serverRoutes(req, res, next);
      } else {
        appHandler(req, res);
      }
    });

    server.listen(PORT, (err: any) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
