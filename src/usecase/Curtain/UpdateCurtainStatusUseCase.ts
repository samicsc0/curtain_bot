import { ICurtainRepository } from "../../domain/Repositories";

export default class UpdateCurtainStatusUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  /**
   *
   *
   * @param {string} curtainId
   * @param {boolean} is_active
   * @return {*} 
   * @memberof UpdateCurtainStatusUseCase
   */
  async execute(curtainId: string, is_active: boolean) {
    return await this._curtainRepository.updateCurtainStatus(
      curtainId,
      is_active
    );
  }
}
