import { IColorRepository } from "../../domain/Repositories";

class UpdateColorUseCase {
  constructor(private readonly colorRepository: IColorRepository) {}
  /**
   *
   *
   * @param {string} color_id
   * @param {string} color_name
   * @return {*}
   * @memberof UpdateColorUseCase
   */
  async execute(color_id: string, color_name: string) {
    return await this.colorRepository.updateColor(color_id, color_name);
  }
}
export default UpdateColorUseCase;
