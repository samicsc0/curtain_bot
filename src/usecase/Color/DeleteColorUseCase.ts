import { IColorRepository } from "../../domain/Repositories";

class DeleteColorUseCase {
  constructor(private readonly colorRepository: IColorRepository) {}
  async execute(color_id: string) {
    return this.colorRepository.deleteColor(color_id);
  }
}
export default DeleteColorUseCase;
