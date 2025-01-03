export class Visitor {
  private visitroId: string;
  private visitorTelegramId: string;
  private visitedDate: string;
  constructor(
    visitroId: string,
    visitorTelegramId: string,
    visitedDate: string
  ) {
    this.visitroId = visitroId;
    this.visitedDate = visitedDate;
    this.visitorTelegramId = visitorTelegramId;
  }
  public getVisitors() {
    return {
      visitroId: this.visitroId,
      visitedDate: this.visitedDate,
      visitorTelegramId: this.visitorTelegramId,
    };
  }
}
