import { PrismaClient } from "@prisma/client";
import { IColorRepository } from "../domain/Repositories";
import { ColorDTO } from "../domain/DTOs";
import { CustomError } from "../infrastructure/express/utils";

class ColorRepository implements IColorRepository {
  constructor(private prismaClient: PrismaClient) {}
  /**
   *
   *
   * @return {*}  {Promise<ColorDTO[]>}
   * @memberof ColorRepository
   */
  async getColors(): Promise<ColorDTO[]> {
    try {
      const colors = await this.prismaClient.color.findMany({
        where: { is_deleted: false },
      });
      const colorDTO: ColorDTO[] = colors.map((item) => {
        return { color_name: item.color_name, color_id: item.color_id };
      });
      return colorDTO;
    } catch (error) {
      throw new Error(error as string);
    }
  }
  /**
   *
   *
   * @param {string} color_id
   * @return {*}  {(Promise<ColorDTO | null>)}
   * @memberof ColorRepository
   */
  getColorById(color_id: string): Promise<ColorDTO | null> {
    try {
      return this.prismaClient.color.findUnique({
        where: { color_id: color_id },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  /**
   *
   *
   * @param {string} colorName
   * @return {*}  {Promise<ColorDTO>}
   * @memberof ColorRepository
   */
  createColor(colorName: string): Promise<ColorDTO> {
    try {
      return this.prismaClient.color.create({
        data: { color_name: colorName },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  /**
   *
   *
   * @param {string} color_id
   * @param {string} color_name
   * @return {*}  {(Promise<ColorDTO | null>)}
   * @memberof ColorRepository
   */
  async updateColor(
    color_id: string,
    color_name: string
  ): Promise<ColorDTO | null> {
    try {
      const color = await this.prismaClient.color.findUnique({
        where: { color_id: color_id },
      });
      if (color) {
        return this.prismaClient.color.update({
          data: { color_name: color_name },
          where: { color_id: color_id },
        });
      } else {
        const customError = new CustomError("Old password is incorrect", 400);
        throw customError;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  /**
   *
   *
   * @param {string} color_id
   * @return {*}  {Promise<ColorDTO>}
   * @memberof ColorRepository
   */
  async deleteColor(color_id: string): Promise<ColorDTO> {
    try {
      const color = await this.prismaClient.color.findUnique({
        where: { color_id: color_id },
      });
      if (color) {
        return this.prismaClient.color.update({
          data: { is_deleted: true },
          where: { color_id: color_id },
        });
      } else {
        const customError = new CustomError("Old password is incorrect", 400);
        throw customError;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
export default ColorRepository;
