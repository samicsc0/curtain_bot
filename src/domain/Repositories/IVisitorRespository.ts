interface IVisitorRepository {
  getTotalUniqueVisitors(): number;
  getDailyUniqueVisitors(): number;
  getTotalVisits(): number;
}
export { IVisitorRepository };
