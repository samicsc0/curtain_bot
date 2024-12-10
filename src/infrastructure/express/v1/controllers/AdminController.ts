import { PrismaClient } from "@prisma/client";
import { AdminRepository } from "../../../../repository";
import { Request, Response } from "express";
import { AdminCreateDTO, AdminDTO } from "../../../../domain/DTOs";
import {
  CreateAdminUseCase,
  GetAdminByIdUseCase,
  GetAllAdminsUseCase,
  UpdateAdminEmailUseCase,
  UpdateAdminPasswordUseCase,
  UpdateAdminStatus,
} from "../../../../usecase/Admin";
import { AuthenticationAuthorizationServices } from "../../services";
import {
  ApiErrorResponseDTO,
  ApiResponseDTO,
  AuthenticationDTO,
} from "../../dtos";

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
const authService = new AuthenticationAuthorizationServices(adminRepository);

const authenticateAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const authResult = await authService.authenticate({ email, password });
      if (!authResult) {
        const response: ApiErrorResponseDTO = {
          errorCode: 401,
          errorMessage: "Invalid Credentials.",
        };
        res.status(401).json(response);
      } else {
        const token = authService.generateToken(authResult);
        const response: ApiResponseDTO<AuthenticationDTO> = {
          statusCode: 200,
          message: "Authenticated Successfully.",
          data: { userInfo: authResult, token: token },
        };
        res.status(200).json(response);
      }
    } else {
      throw new Error("Invalid request");
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

const createAdmin = async (req: Request, res: Response) => {
  try {
    const { admin_first_name, admin_last_name, admin_email, admin_password } =
      req.body;
    const hashedPassword = await authService.encryptPassword(admin_password);
    const adminCreateDto: AdminCreateDTO = {
      admin_email: admin_email,
      admin_first_name: admin_first_name,
      admin_last_name: admin_last_name,
      admin_password: hashedPassword,
    };
    const result = await createAdminUseCase.execute(adminCreateDto);
    const response: ApiResponseDTO<AdminDTO> = {
      statusCode: 201,
      message: "Admin Created Successfully.",
      data: result,
    };
    res.status(201).json(response);
  } catch (error) {
    const response: ApiErrorResponseDTO = {
      errorCode: 500,
      errorMessage: (error as Error).message,
    };
    res.status(500).json(response);
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
    const response: ApiResponseDTO<AdminDTO[]> = {
      statusCode: 200,
      message: "Admins Retrieved Successfully.",
      data: admins,
    };
    res.json(response);
  } catch (error) {
    const response: ApiErrorResponseDTO = {
      errorCode: 500,
      errorMessage: (error as Error).message,
    };
    res.status(500).json(response);
  }
};

const updateAdminEmail = async (req: Request, res: Response) => {
  try {
    const { admin_email } = req.body;
    const success = await updateAdminEmailUseCase.execute(
      req.params.id,
      admin_email
    );
    if (success) {
      const response: ApiResponseDTO<AdminDTO> = {
        statusCode: 200,
        message: "Email updated successfully.",
        data: success,
      };
      res.json(response);
    }
  } catch (error) {
    const response: ApiErrorResponseDTO = {
      errorCode: 500,
      errorMessage: (error as Error).message,
    };
    res.status(500).json(response);
  }
};

const updateAdminPassword = async (req: Request, res: Response) => {
  try {
    const { old_admin_password, new_admin_password } = req.body;
    const success = await updateAdminPasswordUseCase.execute(
      req.params.id,
      old_admin_password,
      await authService.encryptPassword(new_admin_password)
    );
    if (success) {
      const response: ApiResponseDTO<string> = {
        statusCode: 204,
        message: "Password updated successfully.",
        data: "",
      };
      res.status(204).json(response);
    }
  } catch (error) {
    const response: ApiErrorResponseDTO = {
      errorCode: 500,
      errorMessage: (error as Error).message,
    };
    res.status(500).json(response);
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
  authenticateAdmin,
};
