import { CreateCurtainDTO } from '../DTOs';
import { Curtain } from '../entities';
import { CurtainCategory } from '../value-objects';

interface CurtainRepository {
  createCurtain(curtain: CreateCurtainDTO): Promise<Curtain>;
  getCurtainById(curtain_id: string): Promise<Curtain>;
  updateCurtain(
    curtain_id: string,
    curtain: Partial<Curtain>,
  ): Promise<Curtain>;
  deleteCurtain(curtain_id: string): Promise<boolean>;
  getAllCurtains(
    limit: number,
    page: number,
    category?: CurtainCategory,
  ): Promise<Curtain[]>;
}

export { CurtainRepository };
