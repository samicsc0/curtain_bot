import { IColorRepository } from "../../domain/Repositories";

class CreateColorUseCase {
  constructor(private readonly colorRepository: IColorRepository) {}
  /**
   *
   *
   * @param {string} color_name
   * @return {*}
   * @memberof CreateColorUseCase
   */
  async execute(color_name: string) {
    return await this.colorRepository.createColor(color_name);
  }
}
export default CreateColorUseCase;
