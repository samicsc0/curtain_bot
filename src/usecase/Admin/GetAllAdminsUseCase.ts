import { IAdminRepository } from '../../domain/Repositories';

export default class GetAllAdminsUseCase {
  constructor(private _adminRepository: IAdminRepository) {}
  /**
   *
   *
   * @return {*} 
   * @memberof GetAllAdminsUseCase
   */
  async execute() {
    return await this._adminRepository.getAllAdmins();
  }
}
