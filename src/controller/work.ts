import { Context } from "koa";
import { AppDataSource } from "../server";
import { Work } from "../entity/work";
import dayjs from "dayjs";

export default class WorkController {
  private static async getWorks(kind: string) {
    const workRepository = AppDataSource.getRepository(Work);
    const works = await workRepository
      .createQueryBuilder()
      .where({ kind: kind })
      .getMany();

    return works;
  }

  public static async getWork(ctx: Context) {
    const workRepository = AppDataSource.getRepository(Work);
    const work = await workRepository
      .createQueryBuilder()
      .where({
        work_id: ctx.query.work_id,
        kind: ctx.query.kind,
      })
      .getOne();

    if (!work) {
      ctx.status = 401;
      ctx.body = { message: "作品不存在" };
    } else {
      ctx.status = 200;
      ctx.body = work;
    }
  }

  public static async getNew(ctx: Context) {
    const workRepository = AppDataSource.getRepository(Work);

    const works = await workRepository
      .createQueryBuilder()
      .orderBy("updateDate")
      .limit(4)
      .getMany();

    if (works.length === 0) {
      ctx.status = 401;
      ctx.body = { message: "作品不存在" };
    } else {
      ctx.status = 200;
      ctx.body = works;
    }
  }

  public static async getArticles(ctx: Context) {
    const works = await WorkController.getWorks("a");

    if (works.length === 0) {
      ctx.status = 401;
      ctx.body = { message: "作品不存在" };
    } else {
      ctx.status = 200;
      ctx.body = works;
    }
  }

  public static async getEssays(ctx: Context) {
    const works = await WorkController.getWorks("e");

    if (works.length === 0) {
      ctx.status = 401;
      ctx.body = { message: "作品不存在" };
    } else {
      ctx.status = 200;
      ctx.body = works;
    }
  }

  public static async getNovels(ctx: Context) {
    const works = await WorkController.getWorks("n");

    if (works.length === 0) {
      ctx.status = 401;
      ctx.body = { message: "作品不存在" };
    } else {
      ctx.status = 200;
      ctx.body = works;
    }
  }
}
