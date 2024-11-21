import { PrismaClient } from "@prisma/client";
import { AdminRepository } from "../../../../repository";
import { Request, Response } from "express";
import { AdminCreateDTO } from "../../../../domain/DTOs";
import {
  CreateAdminUseCase,
  GetAdminByIdUseCase,
  GetAllAdminsUseCase,
  UpdateAdminEmailUseCase,
  UpdateAdminPasswordUseCase,
  UpdateAdminStatus,
} from "../../../../usecase/Admin";

// DEPENDENCIES
const prisma = new PrismaClient();
const adminRepository = new AdminRepository(prisma);

// INITIALIZE USECASES
const createAdminUseCase = new CreateAdminUseCase(adminRepository);
const getAdminByIdUseCase = new GetAdminByIdUseCase(adminRepository);
const getAllAdminsUseCase = new GetAllAdminsUseCase(adminRepository);
const updateAdminEmailUseCase = new UpdateAdminEmailUseCase(adminRepository);
const updateAdminPasswordUseCase = new UpdateAdminPasswordUseCase(
  adminRepository
);
const updateAdminStatusUseCase = new UpdateAdminStatus(adminRepository);

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
    const admin = await getAdminByIdUseCase.execute(req.params.id);
    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await getAllAdminsUseCase.execute();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const updateAdminEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const success = await updateAdminEmailUseCase.execute(req.params.id, email);
    if (success) {
      res.json({ message: "Email updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const updateAdminPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const success = await updateAdminPasswordUseCase.execute(
      req.params.id,
      password
    );
    if (success) {
      res.json({ message: "Password updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const AdminStatus = async (req: Request, res: Response) => {
  try {
    const { is_active } = req.body;
    const success = await updateAdminStatusUseCase.execute(
      req.params.id,
      is_active
    );
    if (success) {
      res.json({ message: "Status updated successfully" });
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
