import { ICurtainRepository } from "../../domain/Repositories";
import { CurtainCategory } from "../../domain/value-objects";

export default class GetAllCurtainsUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  execute(category: CurtainCategory, page: number) {
    return this._curtainRepository.getAllCurtains( page, category);
  }
}
