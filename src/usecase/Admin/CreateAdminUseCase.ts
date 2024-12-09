import { AdminCreateDTO } from "../../domain/DTOs";
import { IAdminRepository } from "../../domain/Repositories";

export default class CreateAdminUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @param {AdminCreateDTO} adminCreateDto
   * @return {*} 
   * @memberof CreateAdminUseCase
   */
  async execute(adminCreateDto: AdminCreateDTO) {
    return await this._adminRepository.createAdmin(adminCreateDto);
  }
}
