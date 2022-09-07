import Koa from "koa"
import cors from "@koa/cors"
import koaBody from "koa-body"
import router from "./router";

const app = new Koa();

app.use(cors())
app.use(koaBody())

app.use(router.routes).use(router.allowedMethods())

app.listen(9000)