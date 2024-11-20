import { IAdminRepository } from '../../domain/Repositories';

export default class UpdateAdminEmailUseCase {
  constructor(private adminRepository: IAdminRepository) {}
  async execute(email: string, adminId: string) {
    return this.adminRepository.updateAdminEmail(email, adminId);
  }
}
