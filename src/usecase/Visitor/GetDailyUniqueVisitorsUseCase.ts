import { IVisitorRepository } from "../../domain/Repositories";

export default class GetDailyUniqueVisitorsUseCase {
  constructor(private visitorRepository: IVisitorRepository) {}
  execute() {
    return this.visitorRepository.getDailyUniqueVisitors();
  }
}
