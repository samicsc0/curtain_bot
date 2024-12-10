import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminEmailUseCase {
  constructor(private adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @param {string} adminId
   * @param {string} email
   * @return {*} 
   * @memberof UpdateAdminEmailUseCase
   */
  async execute(adminId: string,email: string) {
    return this.adminRepository.updateAdminEmail(adminId, email);
  }
}
