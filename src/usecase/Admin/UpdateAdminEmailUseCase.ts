import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminEmailUseCase {
  constructor(private adminRepository: IAdminRepository) {}
  async execute(adminId: string,email: string) {
    return this.adminRepository.updateAdminEmail(email, adminId);
  }
}
