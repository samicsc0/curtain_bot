import { IColorRepository } from "../../domain/Repositories";

class GetAllColorUseCase {
  constructor(private readonly colorRepository: IColorRepository) {}
  /**
   *
   *
   * @return {*}
   * @memberof GetAllColorUseCase
   */
  async execute() {
    return await this.colorRepository.getColors();
  }
}
export default GetAllColorUseCase;
