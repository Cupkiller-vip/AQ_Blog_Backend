import Koa from "koa";
import cors from "@koa/cors";
import koaBody from "koa-body";
import router from "./router";
import { DataSource, Entity } from "typeorm";

const app = new Koa();

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "koa",
  synchronize: true,
  entities: ["src/entity/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database successfully");
  })
  .catch(() => {
    console.log("Connection to the database failed");
  });

app.use(cors());
app.use(koaBody());

app.use(router.routes).use(router.allowedMethods());

app.listen(9000);
