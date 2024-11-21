import { ICurtainRepository } from "../../domain/Repositories";

export default class DeleteCurtainUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  async execute(curtainId: string) {
    await this._curtainRepository.deleteCurtain(curtainId);
  }
}
