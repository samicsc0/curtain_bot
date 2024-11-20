import { AdminCreateDTO, AdminDTO } from '../DTOs';

interface IAdminRepository {
  createAdmin(admin: AdminCreateDTO): Promise<AdminDTO>;
  getAdminById(admin_id: string): Promise<AdminDTO | null>;
  updateAdminEmail(admin_id: string, email: string): Promise<boolean>;
  updateAdminPassword(admin_id: string, password: string): Promise<boolean>;
  updateAdminStatus(admin_id: string, is_active: boolean): Promise<boolean>;
  getAllAdmins(): Promise<AdminDTO[]>;
}
export { IAdminRepository };
