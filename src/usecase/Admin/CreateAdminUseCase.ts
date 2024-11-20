import { AdminCreateDTO } from '../../domain/DTOs';
import { IAdminRepository } from '../../domain/Repositories';

export default class CreateAdminUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  async execute(adminCreateDto: AdminCreateDTO) {
    return await this._adminRepository.createAdmin(adminCreateDto);
  }
}
