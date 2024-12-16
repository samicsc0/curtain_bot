import { IAdminRepository } from "../../domain/Repositories";

export default class UpdateAdminPasswordUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @param {string} adminId
   * @param {string} old_admin_password
   * @param {string} new_admin_password
   * @return {*}
   * @memberof UpdateAdminPasswordUseCase
   */
  async execute(
    adminId: string,
    old_admin_password: string,
    new_admin_password: string
  ) {
    return this._adminRepository.updateAdminPassword(
      adminId,
      old_admin_password,
      new_admin_password
    );
  }
}
