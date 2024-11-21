import { CreateCurtainDTO } from "../../domain/DTOs";
import { ICurtainRepository } from "../../domain/Repositories";

export default class CreateCurtainUseCase {
  constructor(private curtainRepository: ICurtainRepository) {}
  async execute(curtain: CreateCurtainDTO) {
    return await this.curtainRepository.createCurtain(curtain);
  }
}
