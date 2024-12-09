import { ICurtainRepository } from "../../domain/Repositories";

export default class DeleteCurtainUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  /**
   *
   *
   * @param {string} curtainId
   * @memberof DeleteCurtainUseCase
   */
  async execute(curtainId: string) {
    await this._curtainRepository.deleteCurtain(curtainId);
  }
}
