import { IVisitorRepository } from "../../domain/Repositories";

export default class GetTotalVisitorsUseCase {
  constructor(private visitorRepository: IVisitorRepository) {}
  execute() {
    return this.visitorRepository.getTotalVisits();
  }
}
