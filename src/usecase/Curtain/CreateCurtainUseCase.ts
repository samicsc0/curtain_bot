import { CreateCurtainDTO } from "../../domain/DTOs";
import { ICurtainRepository } from "../../domain/Repositories";

export default class CreateCurtainUseCase {
  constructor(private curtainRepository: ICurtainRepository) {}
  /**
   *
   *
   * @param {CreateCurtainDTO} curtain
   * @return {*} 
   * @memberof CreateCurtainUseCase
   */
  async execute(curtain: CreateCurtainDTO) {
    return await this.curtainRepository.createCurtain(curtain);
  }
}
