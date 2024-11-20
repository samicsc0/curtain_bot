import { PrismaClient } from '@prisma/client';
import { AdminCreateDTO, AdminDTO } from '../domain/DTOs';
import { IAdminRepository } from '../domain/Repositories';

class AdminRepository implements IAdminRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async createAdmin(admin: AdminCreateDTO): Promise<AdminDTO> {
    try {
      const curtain = await this.prisma.admin.create({ data: admin });
      const adminDto: AdminDTO = {
        admin_id: curtain.admin_id,
        admin_email: curtain.admin_email,
        admin_first_name: curtain.admin_first_name,
        admin_last_name: curtain.admin_last_name,
      };
      return adminDto;
    } catch (e) {
      throw new Error(e as string);
    }
  }
  async getAdminById(admin_id: string): Promise<AdminDTO | null> {
    try {
      const admin = await this.prisma.admin.findUnique({ where: { admin_id } });
      if (admin !== null) {
        const adminDto: AdminDTO = {
          admin_id: admin.admin_id,
          admin_email: admin.admin_email,
          admin_first_name: admin.admin_first_name,
          admin_last_name: admin.admin_last_name,
        };
        return adminDto;
      } else {
        return null;
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }
  async updateAdminEmail(admin_id: string, email: string): Promise<boolean> {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { admin_id: admin_id },
      });
      if (admin === null) {
        throw new Error('Admin not found');
      } else {
        await this.prisma.admin.update({
          where: { admin_id },
          data: { admin_email: email },
        });
        return true;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateAdminPassword(
    admin_id: string,
    password: string,
  ): Promise<boolean> {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { admin_id: admin_id },
      });
      if (admin === null) {
        throw new Error('Admin not found');
      } else {
        await this.prisma.admin.update({
          where: { admin_id },
          data: { admin_password: password },
        });
        return true;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateAdminStatus(
    admin_id: string,
    is_active: boolean,
  ): Promise<boolean> {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { admin_id: admin_id },
      });
      if (admin === null) {
        throw new Error('Admin not found');
      } else {
        await this.prisma.admin.update({
          where: { admin_id },
          data: { is_active: is_active },
        });
        return true;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getAllAdmins(): Promise<AdminDTO[]> {
    try {
      const admins = await this.prisma.admin.findMany();
      const adminDto: AdminDTO[] = admins;
      return adminDto;
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
export default AdminRepository;
