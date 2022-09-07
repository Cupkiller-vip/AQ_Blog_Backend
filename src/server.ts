import Koa from "koa"
import cors from "@koa/cors"
import koaBody from "koa-body"

const app = new Koa();

app.use(cors())
app.use(koaBody())

app.listen(9000)