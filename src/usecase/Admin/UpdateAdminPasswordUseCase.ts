import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminPasswordUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @param {string} adminId
   * @param {string} adminPassword
   * @return {*} 
   * @memberof UpdateAdminPasswordUseCase
   */
  async execute(adminId: string, adminPassword: string) {
    return this._adminRepository.updateAdminPassword(adminId, adminPassword);
  }
}
