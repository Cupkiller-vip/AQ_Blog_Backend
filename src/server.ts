import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import router from "./router";
import { DataSource } from "typeorm";
import "reflect-metadata"

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

app.listen(9000);
