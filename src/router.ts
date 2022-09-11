import Router from "@koa/router";

import AuthController from "./controller/auth";

const router = new Router();

router.post("/api/auth/login", AuthController.login);

export default router;
