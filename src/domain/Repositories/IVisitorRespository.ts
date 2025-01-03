import { VisitorDTO } from "../DTOs";

interface IVisitorRepository {
  createVisit(telegramId: string): Promise<VisitorDTO>;
  getTotalUniqueVisitors(): Promise<number>;
  getDailyUniqueVisitors(): Promise<number>;
  getTotalVisits(): Promise<number>;
}
export { IVisitorRepository };
