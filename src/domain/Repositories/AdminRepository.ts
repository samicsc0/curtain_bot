import { AdminCreateDTO, AdminDTO } from '../DTOs';

interface AdminRepository {
  createAdmin(admin: AdminCreateDTO): Promise<AdminDTO>;
  getAdminById(admin_id: string): Promise<AdminDTO>;
  updateAdminEmail(admin_id: string, email: string): Promise<boolean>;
  updateAdminPassword(admin_id: string, password: string): Promise<boolean>;
  deactivateAdmin(admin_id: string): Promise<boolean>;
  getAllAdmins(): Promise<AdminDTO[]>;
}
export { AdminRepository };
