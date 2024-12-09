import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminStatus {
  constructor(private _adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @param {string} adminId
   * @param {boolean} is_active
   * @return {*} 
   * @memberof UpdateAdminStatus
   */
  async execute(adminId: string, is_active: boolean) {
    return await this._adminRepository.updateAdminStatus(adminId, is_active);
  }
}
