import { ICurtainRepository } from "../../domain/Repositories";

export default class UpdateCurtainImageUseCase {
  constructor(private _curtainRepository: ICurtainRepository) {}
  async execute(curtain_id: string, curtain_image_url: string) {
    return await this._curtainRepository.updateCurtainImage(
      curtain_id,
      curtain_image_url
    );
  }
}
