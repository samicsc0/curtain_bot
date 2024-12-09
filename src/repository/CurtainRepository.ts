import { PrismaClient } from "@prisma/client";
import { CreateCurtainDTO } from "../domain/DTOs";
import { ICurtainRepository } from "../domain/Repositories";
import { CurtainDto, UpdateCurtainDTO } from "../domain/DTOs/CurtainDTO";
import { CurtainCategory } from "../domain/value-objects";

/**
 *
 *
 * @class CurtainRepository
 * @implements {ICurtainRepository}
 */
class CurtainRepository implements ICurtainRepository {
  constructor(private prisma: PrismaClient) {}
  /**
   *
   *
   * @param {CreateCurtainDTO} curtain
   * @return {*}  {Promise<CurtainDto>}
   * @memberof CurtainRepository
   */
  async createCurtain(curtain: CreateCurtainDTO): Promise<CurtainDto> {
    try {
      const createdCurtain = await this.prisma.curtain.create({
        data: curtain,
      });
      const curtainDto: CurtainDto = {
        curtain_id: createdCurtain.curtain_id,
        curtain_name: createdCurtain.curtain_name,
        curtain_base_price: createdCurtain.curtain_base_price,
        curtain_color: createdCurtain.curtain_color,
        curtain_category: createdCurtain.curtain_category as CurtainCategory,
        curtain_image_url: createdCurtain.curtain_image_url,
        curtain_description: createdCurtain.curtain_description,
        is_active: createdCurtain.is_active,
      };
      return curtainDto;
    } catch (e) {
      throw new Error(e as string);
    }
  }
  /**
   *
   *
   * @param {string} curtain_id
   * @return {*}  {Promise<CurtainDto>}
   * @memberof CurtainRepository
   */
  async getCurtainById(curtain_id: string): Promise<CurtainDto> {
    try {
      const curtain = await this.prisma.curtain.findUnique({
        where: { curtain_id },
      });
      if (curtain) {
        const curtainDto: CurtainDto = {
          curtain_id: curtain.curtain_id,
          curtain_name: curtain.curtain_name,
          curtain_base_price: curtain.curtain_base_price,
          curtain_color: curtain.curtain_color,
          curtain_category: curtain.curtain_category as CurtainCategory,
          curtain_image_url: curtain.curtain_image_url,
          curtain_description: curtain.curtain_description,
          is_active: curtain.is_active,
        };
        return curtainDto;
      } else {
        throw new Error("Curtain not found");
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }
  /**
   *
   *
   * @param {string} curtain_id
   * @param {UpdateCurtainDTO} curtain
   * @return {*}  {Promise<CurtainDto>}
   * @memberof CurtainRepository
   */
  async updateCurtain(
    curtain_id: string,
    curtain: UpdateCurtainDTO
  ): Promise<CurtainDto> {
    try {
      const curtainExists = await this.prisma.curtain.findUnique({
        where: { curtain_id },
      });
      if (curtainExists) {
        const updatedCurtain = await this.prisma.curtain.update({
          data: {
            curtain_name: curtain.curtain_name,
            curtain_base_price: curtain.curtain_base_price,
            curtain_category: curtain.curtain_category,
            curtain_color: curtain.curtain_color,
            curtain_description: curtain.curtain_description,
          },
          where: { curtain_id: curtain_id },
        });
        const curtainDto: CurtainDto = {
          curtain_id: updatedCurtain.curtain_id,
          curtain_name: updatedCurtain.curtain_name,
          curtain_base_price: updatedCurtain.curtain_base_price,
          curtain_color: updatedCurtain.curtain_color,
          curtain_category: updatedCurtain.curtain_category as CurtainCategory,
          curtain_image_url: updatedCurtain.curtain_image_url,
          curtain_description: updatedCurtain.curtain_description,
          is_active: updatedCurtain.is_active,
        };
        return curtainDto;
      } else {
        throw new Error("Curtain not found");
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  /**
   *
   *
   * @param {string} curtain_id
   * @param {boolean} is_active
   * @return {*}  {Promise<CurtainDto>}
   * @memberof CurtainRepository
   */
  async updateCurtainStatus(
    curtain_id: string,
    is_active: boolean
  ): Promise<CurtainDto> {
    try {
      const curtainExists = await this.prisma.curtain.findUnique({
        where: { curtain_id: curtain_id },
      });
      if (curtainExists) {
        const updatedCurtain = await this.prisma.curtain.update({
          data: { is_active: is_active },
          where: { curtain_id: curtain_id },
        });
        const curtainDto: CurtainDto = {
          curtain_id: updatedCurtain.curtain_id,
          curtain_name: updatedCurtain.curtain_name,
          curtain_base_price: updatedCurtain.curtain_base_price,
          curtain_color: updatedCurtain.curtain_color,
          curtain_category: updatedCurtain.curtain_category as CurtainCategory,
          curtain_image_url: updatedCurtain.curtain_image_url,
          curtain_description: updatedCurtain.curtain_description,
          is_active: updatedCurtain.is_active,
        };
        return curtainDto;
      } else {
        throw new Error("Curtain not found");
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }
  /**
   *
   *
   * @param {string} curtain_id
   * @return {*}  {Promise<boolean>}
   * @memberof CurtainRepository
   */
  async deleteCurtain(curtain_id: string): Promise<boolean> {
    try {
      const curtainExists = await this.prisma.curtain.findUnique({
        where: { curtain_id: curtain_id },
      });
      if (curtainExists) {
        await this.prisma.curtain.update({
          data: { is_deleted: true },
          where: { curtain_id: curtain_id },
        });
        return true;
      } else {
        throw new Error("Curtain not found");
      }
    } catch (e) {
      throw new Error(e as string);
    }
  }
  /**
   *
   *
   * @param {number} page
   * @param {CurtainCategory} [category]
   * @return {*}  {Promise<CurtainDto[]>}
   * @memberof CurtainRepository
   */
  async getAllCurtains(
    page: number,
    category?: CurtainCategory
  ): Promise<CurtainDto[]> {
    try {
      const currentpage:number = page || 10;
      const whereCondition = category ? { curtain_category: category } : {};
      const curtain = await this.prisma.curtain.findMany({
        where: whereCondition,
        take: 10,
        skip: (currentpage - 1) * 10,
      });
      const curtainDto: CurtainDto[] = curtain.map((curtain) => ({
        curtain_id: curtain.curtain_id,
        curtain_name: curtain.curtain_name,
        curtain_base_price: curtain.curtain_base_price,
        curtain_color: curtain.curtain_color,
        curtain_category: curtain.curtain_category as CurtainCategory,
        curtain_image_url: curtain.curtain_image_url,
        curtain_description: curtain.curtain_description,
        is_active: curtain.is_active,
      }));
      return curtainDto;
    } catch (e) {
      throw new Error(e as string);
    }
  }
}
export default CurtainRepository;