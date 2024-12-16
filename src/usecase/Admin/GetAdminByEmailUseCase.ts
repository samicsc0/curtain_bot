import { AdminDTO } from "../../domain/DTOs";
import { IAdminRepository } from "../../domain/Repositories";

export default class GetAdminByEmailUseCase {
  constructor(private _adminRepository: IAdminRepository) {
    this._adminRepository = _adminRepository;
  }
  async execute(email: string): Promise<AdminDTO | null> {
    const admin = await this._adminRepository.getAdminByEmail(email);
    if (!admin) {
      return null;
    }
    const adminDto: AdminDTO = {
      admin_email: admin.admin_email,
      admin_first_name: admin.admin_first_name,
      admin_id: admin.admin_id,
      admin_last_name: admin.admin_last_name,
    };
    return adminDto;
  }
}
