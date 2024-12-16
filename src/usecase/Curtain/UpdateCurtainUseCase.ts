import { UpdateCurtainDTO } from "../../domain/DTOs/CurtainDTO";
import { ICurtainRepository } from "../../domain/Repositories";

export default class UpdateCurtainUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  /**
   *
   *
   * @param {string} curtain_id
   * @param {UpdateCurtainDTO} curtain
   * @return {*} 
   * @memberof UpdateCurtainUseCase
   */
  async execute(curtain_id: string, curtain: UpdateCurtainDTO) {
    return await this._curtainRepository.updateCurtain(curtain_id, curtain);
  }
}
