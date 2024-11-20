import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminPasswordUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  async execute(adminId: string, adminPassword: string) {
    return this._adminRepository.updateAdminPassword(adminId, adminPassword);
  }
}
