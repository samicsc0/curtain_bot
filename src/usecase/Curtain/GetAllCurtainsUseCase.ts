import { ICurtainRepository } from "../../domain/Repositories";
import { CurtainCategory } from "../../domain/value-objects";

export default class GetAllCurtainsUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  /**
   *
   *
   * @param {CurtainCategory} category
   * @param {number} page
   * @return {*} 
   * @memberof GetAllCurtainsUseCase
   */
  execute(category: CurtainCategory, page: number) {
    return this._curtainRepository.getAllCurtains( page, category);
  }
}
