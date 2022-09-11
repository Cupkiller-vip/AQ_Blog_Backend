import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import router from "./router";
import { DataSource } from "typeorm";
import jwt from "koa-jwt";
import "reflect-metadata"
import { JWT_SECRET } from "./constants";

const app = new Koa();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "pass",
  database: "koa",
  synchronize: true,
  entities: ["src/entity/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch((e) => {
    console.log("Connection to the database failed",e);
  });

app.use(cors());
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());
app.use(jwt({secret: JWT_SECRET}).unless({ method: "get"}))


app.listen(9000);
