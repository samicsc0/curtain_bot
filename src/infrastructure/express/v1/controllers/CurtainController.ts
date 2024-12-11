import { Request, Response } from "express";
import { CreateCurtainDTO } from "../../../../domain/DTOs";
import { PrismaClient } from "@prisma/client";
import { CurtainRepository } from "../../../../repository";
import {
  CreateCurtainUseCase,
  DeleteCurtainUseCase,
  GetAllCurtainsUseCase,
  GetCurtainByIdUseCase,
  UpdateCurtainImageUseCase,
  UpdateCurtainStatusUseCase,
  UpdateCurtainUseCase,
} from "../../../../usecase/Curtain";
import { CurtainCategory } from "../../../../domain/value-objects";
import {
  CurtainDto,
  UpdateCurtainDTO,
} from "../../../../domain/DTOs/CurtainDTO";
import { AsyncErrorHandler } from "../../utils";
import { ApiResponseDTO } from "../../dtos";

// DEPENDENCIS
const prisma = new PrismaClient();
const curtainRepository = new CurtainRepository(prisma);

// USECASE INITIALIZATION
const createCurtainUsecase = new CreateCurtainUseCase(curtainRepository);
const deleteCurtainUseCase = new DeleteCurtainUseCase(curtainRepository);
const getAllCurtainsUseCase = new GetAllCurtainsUseCase(curtainRepository);
const getCurtainByIdUseCase = new GetCurtainByIdUseCase(curtainRepository);
const updateCurtainStatusUseCase = new UpdateCurtainStatusUseCase(
  curtainRepository
);
const updateCurtainUseCase = new UpdateCurtainUseCase(curtainRepository);
const updateCurtainImageUseCase = new UpdateCurtainImageUseCase(
  curtainRepository
);

const createCurtain = AsyncErrorHandler(async (req: Request, res: Response) => {
  const curtainData: CreateCurtainDTO = req.body;
  const result = await createCurtainUsecase.execute(curtainData);
  const response: ApiResponseDTO<CreateCurtainDTO> = {
    status: "Success",
    message: "Curtain created successfully",
    statusCode: 201,
    data: result,
  };
  res.status(201).json(response);
});
const deleteCurtain = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteCurtainUseCase.execute(id);
  const response:ApiResponseDTO<string> = {
    status: "Success",
    message:" Curtain deleted successfully",
    statusCode:204,
    data:"",
  }
  res.status(200).json(response);
});
const getAllCurtains = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const { page, category } = req.query;
    const result = await getAllCurtainsUseCase.execute(
      category as CurtainCategory,
      page ? parseInt(page as string) : 1
    );
    const response: ApiResponseDTO<CurtainDto[]> = {
      status: "Success",
      statusCode: 200,
      message: "Curtains retrieved successfully",
      data: result,
      totalData: result.length,
      page: page ? parseInt(page as string) : 1,
    };
    res.status(200).json(response);
  }
);
const getCurtainById = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getCurtainByIdUseCase.execute(id);
    const response: ApiResponseDTO<CurtainDto> = {
      status: "Success",
      statusCode: 200,
      message: " Curtain found",
      data: result,
    };
    res.status(200).json(response);
  }
);
const updateCurtain = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateCurtain: UpdateCurtainDTO = req.body;
  const result = await updateCurtainUseCase.execute(id, updateCurtain);
  const response: ApiResponseDTO<CurtainDto> = {
    status: "Success",
    statusCode: 200,
    message: "Curtain updated successfully",
    data: result,
  };
  res.status(200).json(response);
});
const updateCurtainStatus = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { is_active } = req.body;
    const result = await updateCurtainStatusUseCase.execute(id, is_active);
    const response: ApiResponseDTO<CurtainDto> = {
      status: "Success",
      statusCode: 200,
      message: "Curtain status updated successfully",
      data: result,
    };
    res.status(200).json(response);
  }
);
const updateCurtainImage = AsyncErrorHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { curtain_image_url } = req.body;
    const result = await updateCurtainImageUseCase.execute(
      id,
      curtain_image_url
    );
    const response: ApiResponseDTO<CurtainDto> = {
      status: "Success",
      statusCode: 200,
      message: "Curtain image updated successfully",
      data: result,
    };
    res.status(200).json(response);
  }
);
export {
  createCurtain,
  getCurtainById,
  getAllCurtains,
  updateCurtain,
  updateCurtainStatus,
  updateCurtainImage,
  deleteCurtain,
};
