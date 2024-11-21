import { Request, Response } from "express";
import { CreateCurtainDTO } from "../../../../domain/DTOs";
import { PrismaClient } from "@prisma/client";
import { CurtainRepository } from "../../../../repository";
import {
  CreateCurtainUseCase,
  DeleteCurtainUseCase,
  GetAllCurtainsUseCase,
  GetCurtainByIdUseCase,
  UpdateCurtainStatusUseCase,
  UpdateCurtainUseCase,
} from "../../../../usecase/Curtain";
import { CurtainCategory } from "../../../../domain/value-objects";
import { UpdateCurtainDTO } from "../../../../domain/DTOs/CurtainDTO";

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

const createCurtain = async(req: Request, res: Response) => {
  try {
    const curtainData: CreateCurtainDTO = req.body;
    const result = await createCurtainUsecase.execute(curtainData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const deleteCurtain = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = deleteCurtainUseCase.execute(id);
     res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const getAllCurtains = (req: Request, res: Response) => {
  try {
    const { page, category } = req.query;
    const result = getAllCurtainsUseCase.execute(
      category as CurtainCategory,
      parseInt(page as string)
    );
     res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
 const getCurtainById = async (req: Request, res: Response) => {
   try {
     const id = req.params.id;
     const result = await getCurtainByIdUseCase.execute(id);
     res.status(200).json(result);
   } catch (error) {
     res.status(500).json({ error: (error as Error).message });
   }
 };
const updateCurtain = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateCurtain: UpdateCurtainDTO = req.body;
    const result = updateCurtainUseCase.execute(id, updateCurtain);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
const updateCurtainStatus = (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { is_active } = req.body;
    const result = updateCurtainStatusUseCase.execute(id, is_active);
     res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export {
  createCurtain,
  getCurtainById,
  getAllCurtains,
  updateCurtain,
  updateCurtainStatus,
  deleteCurtain,
};
