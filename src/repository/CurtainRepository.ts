import { PrismaClient } from "@prisma/client";
import { CreateCurtainDTO } from "../domain/DTOs";
import { ICurtainRepository } from "../domain/Repositories";
import { CurtainDto, UpdateCurtainDTO } from "../domain/DTOs/CurtainDTO";
import { CurtainCategory } from "../domain/value-objects";
import { CustomError } from "../infrastructure/express/utils";

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
        data: {
          curtain_name: curtain.curtain_name,
          curtain_category: curtain.curtain_category,
          curtain_color: { connect: { color_id: curtain.curtain_color } },
          curtain_image_url: curtain.curtain_image_url,
          curtain_base_price: curtain.curtain_base_price,
          curtain_description: curtain.curtain_description,
        },
        include: { curtain_color: true },
      });
      const curtainDto: CurtainDto = {
        curtain_id: createdCurtain.curtain_id,
        curtain_name: createdCurtain.curtain_name,
        curtain_base_price: createdCurtain.curtain_base_price,
        curtain_color: {
          color_id: createdCurtain.curtain_color.color_id,
          color_name: createdCurtain.curtain_color.color_name,
        },
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
    const curtain = await this.prisma.curtain.findUnique({
      where: { curtain_id: curtain_id, is_deleted: false },
      include: { curtain_color: true },
    });
    if (curtain) {
      const curtainDto: CurtainDto = {
        curtain_id: curtain.curtain_id,
        curtain_name: curtain.curtain_name,
        curtain_base_price: curtain.curtain_base_price,
        curtain_color: {
          color_id: curtain.curtain_color.color_id,
          color_name: curtain.curtain_color.color_name,
        },
        curtain_category: curtain.curtain_category as CurtainCategory,
        curtain_image_url: curtain.curtain_image_url,
        curtain_description: curtain.curtain_description,
        is_active: curtain.is_active,
      };
      return curtainDto;
    } else {
      const customError = new CustomError("Curtain not found", 404);
      throw customError;
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
    const curtainExists = await this.prisma.curtain.findUnique({
      where: { curtain_id },
    });
    if (curtainExists) {
      const updatedCurtain = await this.prisma.curtain.update({
        data: {
          curtain_name: curtain.curtain_name,
          curtain_base_price: curtain.curtain_base_price,
          curtain_category: curtain.curtain_category,
          curtain_color: { connect: { color_id: curtain.curtain_name } },
          curtain_description: curtain.curtain_description,
        },
        where: { curtain_id: curtain_id },
        include: { curtain_color: true },
      });
      const curtainDto: CurtainDto = {
        curtain_id: updatedCurtain.curtain_id,
        curtain_name: updatedCurtain.curtain_name,
        curtain_base_price: updatedCurtain.curtain_base_price,
        curtain_color: {
          color_id: updatedCurtain.curtain_color.color_id,
          color_name: updatedCurtain.curtain_color.color_name,
        },
        curtain_category: updatedCurtain.curtain_category as CurtainCategory,
        curtain_image_url: updatedCurtain.curtain_image_url,
        curtain_description: updatedCurtain.curtain_description,
        is_active: updatedCurtain.is_active,
      };
      return curtainDto;
    } else {
      const customError = new CustomError("Curtain not found", 404);
      throw customError;
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
    const curtainExists = await this.prisma.curtain.findUnique({
      where: { curtain_id: curtain_id },
    });
    if (curtainExists) {
      const updatedCurtain = await this.prisma.curtain.update({
        data: { is_active: is_active },
        where: { curtain_id: curtain_id },
        include: { curtain_color: true },
      });
      const curtainDto: CurtainDto = {
        curtain_id: updatedCurtain.curtain_id,
        curtain_name: updatedCurtain.curtain_name,
        curtain_base_price: updatedCurtain.curtain_base_price,
        curtain_color: {
          color_id: updatedCurtain.curtain_color.color_id,
          color_name: updatedCurtain.curtain_color.color_name,
        },
        curtain_category: updatedCurtain.curtain_category as CurtainCategory,
        curtain_image_url: updatedCurtain.curtain_image_url,
        curtain_description: updatedCurtain.curtain_description,
        is_active: updatedCurtain.is_active,
      };
      return curtainDto;
    } else {
      const customError = new CustomError("Curtain not found", 404);
      throw customError;
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
      const customError = new CustomError("Curtain not found", 404);
      throw customError;
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
    page: number = 1,
    category?: CurtainCategory
  ): Promise<CurtainDto[]> {
    try {
      const currentpage: number = page;
      const whereCondition = category
        ? { curtain_category: category, is_deleted: false }
        : { is_deleted: false };
      const curtains = await this.prisma.curtain.findMany({
        where: whereCondition,
        orderBy: {
          created_at: "desc",
        },
        take: 3,
        skip: (currentpage - 1) * 3,
        include: {
          curtain_color: true,
        },
      });
      const curtainDto = curtains.map((curtain) => ({
        curtain_id: curtain.curtain_id,
        curtain_name: curtain.curtain_name,
        curtain_base_price: curtain.curtain_base_price,
        curtain_color: {
          color_id: curtain.curtain_color.color_id,
          color_name: curtain.curtain_color.color_name,
        },
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
  /**
   *
   *
   * @param {string} curtain_id
   * @param {string} curtain_image_url
   * @return {*}  {Promise<CurtainDto>}
   * @memberof CurtainRepository
   */
  async updateCurtainImage(
    curtain_id: string,
    curtain_image_url: string
  ): Promise<CurtainDto> {
    const curtainExists = await this.prisma.curtain.findUnique({
      where: { curtain_id: curtain_id },
    });
    if (curtainExists) {
      const updatedCurtain = await this.prisma.curtain.update({
        data: { curtain_image_url: curtain_image_url },
        where: { curtain_id: curtain_id },
        include: { curtain_color: true },
      });
      const curtainDto: CurtainDto = {
        curtain_id: updatedCurtain.curtain_id,
        curtain_name: updatedCurtain.curtain_name,
        curtain_base_price: updatedCurtain.curtain_base_price,

        curtain_color: {
          color_id: updatedCurtain.curtain_color.color_id,
          color_name: updatedCurtain.curtain_color.color_name,
        },
        curtain_category: updatedCurtain.curtain_category as CurtainCategory,
        curtain_image_url: updatedCurtain.curtain_image_url,
        curtain_description: updatedCurtain.curtain_description,
        is_active: updatedCurtain.is_active,
      };
      return curtainDto;
    } else {
      const customError = new CustomError("Curtain not found", 404);
      throw customError;
    }
  }
}
export default CurtainRepository;
