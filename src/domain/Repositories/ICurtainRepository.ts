import { CreateCurtainDTO } from "../DTOs";
import { CurtainDto, UpdateCurtainDTO } from "../DTOs/CurtainDTO";
import { CurtainCategory } from "../value-objects";

interface ICurtainRepository {
  createCurtain(curtain: CreateCurtainDTO): Promise<CurtainDto>;
  getCurtainById(curtain_id: string): Promise<CurtainDto>;
  updateCurtain(
    curtain_id: string,
    curtain: UpdateCurtainDTO
  ): Promise<CurtainDto>;
  updateCurtainStatus(
    curtain_id: string,
    is_active: boolean
  ): Promise<CurtainDto>;
  deleteCurtain(curtain_id: string): Promise<boolean>;
  updateCurtainImage(
    curtain_id: string,
    curtain_image_url: string
  ): Promise<CurtainDto>;
  getAllCurtains(
    page: number,
    category?: CurtainCategory,
    color?: string
  ): Promise<CurtainDto[]>;
}

export { ICurtainRepository };
