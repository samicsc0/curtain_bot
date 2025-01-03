import { PrismaClient } from "@prisma/client";
import { IVisitorRepository } from "../domain/Repositories";
import { VisitorDTO } from "../domain/DTOs";

class VisitorRepository implements IVisitorRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createVisit(telegramId: string): Promise<VisitorDTO> {
    const createdVisitor = await this.prismaClient.visitor.create({
      data: { telegram_id: telegramId },
    });
    const visitor: VisitorDTO = {
      visitorId: createdVisitor.visitor_id,
      visitorTelegramId: createdVisitor.telegram_id,
      visitedAt: createdVisitor.created_at.toISOString(),
    };
    return visitor;
  }

  async getTotalUniqueVisitors(): Promise<number> {
    const result = await this.prismaClient.$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT telegram_id) AS count
      FROM visitor;
    `;
    return result[0]?.count || 0;
  }

  async getTotalVisits(): Promise<number> {
    const count = await this.prismaClient.visitor.count();
    return count;
  }

  async getDailyUniqueVisitors(): Promise<number> {
    const date = new Date();
    const startDate = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const endDate = new Date(date.getTime() + 86400000).toISOString();

    const count = await this.prismaClient.visitor.count({
      where: {
        created_at: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
    });
    return count;
  }
}
export { VisitorRepository };
