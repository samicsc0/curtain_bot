import { IVisitorRepository } from "../../domain/Repositories";

export default class CreateVisitorUseCase {
  constructor(private visitorRepository: IVisitorRepository) {}
  execute(telegramId: string) {
    return this.visitorRepository.createVisit(telegramId);
  }
}
