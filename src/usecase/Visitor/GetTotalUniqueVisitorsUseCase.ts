import { IVisitorRepository } from "../../domain/Repositories";

export default class GetTotalUniqueVisitorsUseCase {
  constructor(private visitorRepository: IVisitorRepository) {}
  execute() {
    return this.visitorRepository.getTotalUniqueVisitors();
  }
}
