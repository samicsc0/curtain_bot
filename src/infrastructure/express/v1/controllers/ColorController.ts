import { PrismaClient } from "@prisma/client";
import { ColorRepository } from "../../../../repository";
import {
  CreateColorUseCase,
  DeleteColorUseCase,
  GetAllColorUseCase,
  UpdateColorUseCase,
} from "../../../../usecase/Color";
import { AsyncErrorHandler } from "../../utils";
import { Request, Response } from "express";
import { ApiResponseDTO } from "../../dtos";
import { ColorDTO } from "../../../../domain/DTOs";
import {
  ColorResponseDTO,
  CreateColorDTO,
} from "../../../../domain/DTOs/ColorDTO";

// DEPENDECIES

const prisma = new PrismaClient();
const curtainRepository = new ColorRepository(prisma);

// USECASE

const getAllColorUseCase = new GetAllColorUseCase(curtainRepository);
const createColorUseCase = new CreateColorUseCase(curtainRepository);
const updateColorUseCase = new UpdateColorUseCase(curtainRepository);
const deleteColorUseCase = new DeleteColorUseCase(curtainRepository);
const getAllColors = AsyncErrorHandler(async (_req: Request, res: Response) => {
  const result = await getAllColorUseCase.execute();
  const response: ApiResponseDTO<ColorDTO[]> = {
    statusCode: 200,
    status: "Success",
    data: result,
    message: "Colors fetched successfully.",
  };
  res.status(200).json(response);
});
const createColor = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { color_name }: CreateColorDTO = req.body;
  const result = await createColorUseCase.execute(color_name);
  const response: ApiResponseDTO<ColorResponseDTO> = {
    statusCode: 201,
    status: "Success",
    data: result,
    message: "Color created successfully.",
  };
  res.status(201).json(response);
});
const updateColor = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { color_name }: CreateColorDTO = req.body;
  const id = req.params.id;
  const result = await updateColorUseCase.execute(id, color_name);
  const response: ApiResponseDTO<ColorResponseDTO | null> = {
    statusCode: 200,
    status: "Fail",
    data: result,
    message: "Color updated successfully.",
  };
  res.status(200).json(response);
});
const deleteColor = AsyncErrorHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteColorUseCase.execute(id);
  const response: ApiResponseDTO<null> = {
    statusCode: 204,
    status: "Success",
    data: null,
    message: "Color deleted successfully.",
  };
  res.status(204).json(response);
});
export { getAllColors, createColor, updateColor, deleteColor };
