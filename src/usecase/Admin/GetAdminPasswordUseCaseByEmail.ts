import { IAdminRepository } from "../../domain/Repositories";

export default class GetAdminPasswordUseCaseByEmail {
  constructor(private _adminRepository: IAdminRepository) {
    this._adminRepository = _adminRepository;
  }
  /**
   *
   *
   * @param {string} admin_email
   * @return {*} 
   * @memberof GetAdminPasswordUseCaseByEmail
   */
  execute(admin_email: string) {
    return this._adminRepository.getAdminPasswordByEmail(admin_email);
  }
}
