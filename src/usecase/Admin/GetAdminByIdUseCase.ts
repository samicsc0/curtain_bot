import { IAdminRepository } from '../../domain/Repositories';

export default class GetAdminByIdUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  async execute(adminId: string) {
    return await this._adminRepository.getAdminById(adminId);
  }
}
