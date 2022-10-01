import { Context } from "koa";
import { AppDataSource } from "../server";
import { User } from "../entity/user";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = AppDataSource.getRepository(User);
    console.log(ctx.request.body)
    const user = await userRepository
      .createQueryBuilder()
      .where({ username: ctx.request.body.username })
      .addSelect("User.password")
      .getOne();

    if (!user) {
      ctx.status = 401;
      ctx.body = { message: "用户名不存在" };
    } else if (user.password === ctx.request.body.password) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ id: user.user_id }, JWT_SECRET) };
    } else {
      ctx.status = 401;
      ctx.body = { message: "密码错误" };
    }
  }
}
