import { PrismaClient } from '@prisma/client';
import { AdminRepository } from '../../../../repository';
const prisma = new PrismaClient();
const adminRepository = new AdminRepository(prisma);
import { Request, Response } from 'express';
import { AdminCreateDTO } from '../../../../domain/DTOs';
import CreateAdminUseCase from '../../../../usecase/Admin/CreateAdminUseCase';

const createAdminUseCase = new CreateAdminUseCase(adminRepository);

const createAdmin = async (req: Request, res: Response) => {
  try {
    const adminCreateDto: AdminCreateDTO = req.body;
    const result = await createAdminUseCase.execute(adminCreateDto);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  try {
    const admin = await adminRepository.getAdminById(req.params.id);
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await adminRepository.getAllAdmins();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const updateAdminEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const success = await adminRepository.updateAdminEmail(
      req.params.id,
      email,
    );
    if (success) {
      res.json({ message: 'Email updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const updateAdminPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const success = await adminRepository.updateAdminPassword(
      req.params.id,
      password,
    );
    if (success) {
      res.json({ message: 'Password updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const AdminStatus = async (req: Request, res: Response) => {
  try {
    const { is_active } = req.body;
    const success = await adminRepository.updateAdminStatus(
      req.params.id,
      is_active,
    );
    if (success) {
      res.json({ message: 'Status updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export {
  createAdmin,
  getAdminById,
  getAllAdmins,
  updateAdminEmail,
  updateAdminPassword,
  AdminStatus,
};
