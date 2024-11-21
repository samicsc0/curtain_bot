import { ICurtainRepository } from "../../domain/Repositories";

export default class GetCurtainByIdUseCase {
  constructor(private curtainRepository: ICurtainRepository) {}
  async execute(curtainId: string) {
    return await this.curtainRepository.getCurtainById(curtainId);
  }
}
