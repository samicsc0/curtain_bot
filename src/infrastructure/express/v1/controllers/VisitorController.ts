import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { VisitorRepository } from "../../../../repository";
import {
  CreateVisitorUseCase,
  GetDailyUniqueVisitorsUseCase,
  GetTotalUniqueVisitorsUseCase,
  GetTotalVisitorsUseCase,
} from "../../../../usecase/Visitor";
import { VisitorDTO } from "../../../../domain/DTOs";
import { ApiResponseDTO } from "../../dtos";
import { AsyncErrorHandler } from "../../utils";

const prisma = new PrismaClient();
const visitorRepository = new VisitorRepository(prisma);

const createVisitorUseCase = new CreateVisitorUseCase(visitorRepository);
const getDailyUniqueVisitorsUseCase = new GetDailyUniqueVisitorsUseCase(
  visitorRepository
);
const getTotalUniqueVisitorsUseCase = new GetTotalUniqueVisitorsUseCase(
  visitorRepository
);
const getTotalVisitsUseCase = new GetTotalVisitorsUseCase(visitorRepository);

const createVisitor = AsyncErrorHandler(async (req: Request, res: Response) => {
  const { telegramId }: { telegramId: string } = req.body;
  const result = await createVisitorUseCase.execute(telegramId);
  const response: ApiResponseDTO<VisitorDTO> = {
    status: "Success",
    message: "Visitor created successfully",
    statusCode: 201,
    data: result,
  };
  res.status(201).json(response);
});

const getDailyUniqueVisitors = AsyncErrorHandler(
  async (_req: Request, res: Response) => {
    const result = await getDailyUniqueVisitorsUseCase.execute();
    const response: ApiResponseDTO<number> = {
      status: "Success",
      message: "Daily unique visitors retrieved successfully",
      statusCode: 200,
      data: result,
    };
    res.status(200).json(response);
  }
);

const getTotalUniqueVisitors = AsyncErrorHandler(
  async (_req: Request, res: Response) => {
    const result = await getTotalUniqueVisitorsUseCase.execute();
    const response: ApiResponseDTO<number> = {
      status: "Success",
      message: "Total unique visitors retrieved successfully",
      statusCode: 200,
      data: result,
    };
    res.status(200).json(response);
  }
);

const getTotalVisits = AsyncErrorHandler(
  async (_req: Request, res: Response) => {
    const result = await getTotalVisitsUseCase.execute();
    const response: ApiResponseDTO<number> = {
      status: "Success",
      message: "Total visits retrieved successfully",
      statusCode: 200,
      data: result,
    };
    res.status(200).json(response);
  }
);

export {
  createVisitor,
  getDailyUniqueVisitors,
  getTotalUniqueVisitors,
  getTotalVisits,
};
