import Router from "@koa/router";

import AuthController from "./controller/auth";
import WorkController from "./controller/work";

const router = new Router();
//用户部分路由
router.post("/api/auth/login", AuthController.login);
//作品部分路由
router.post("/api/work", WorkController.getWork);
router.get("/api/articles", WorkController.getArticles);
router.get("/api/essays", WorkController.getEssays);
router.get("/api/novels", WorkController.getNovels);
router.get("/api/getNew", WorkController.getNew);

export default router;
