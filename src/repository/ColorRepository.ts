import { PrismaClient } from "@prisma/client";
import { IColorRepository } from "../domain/Repositories";
import { ColorDTO } from "../domain/DTOs";

class ColorRepository implements IColorRepository {
  constructor(private prismaClient: PrismaClient) {}
  getColors(): Promise<ColorDTO[]> {
    try {
      return this.prismaClient.color.findMany();
    } catch (error) {
      throw new Error(error as string);
    }
  }
  getColor(color_id: string): Promise<ColorDTO | null> {
    try {
      return this.prismaClient.color.findUnique({
        where: { color_id: color_id },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  createColor(colorName: string): Promise<ColorDTO> {
    try {
      return this.prismaClient.color.create({
        data: { color_name: colorName },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  updateColor(color_id: string, color_name: string): Promise<ColorDTO | null> {
    try {
      return this.prismaClient.color.update({
        data: { color_name: color_name },
        where: { color_id: color_id },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  deleteColor(color_id: string): Promise<ColorDTO> {
    try {
      return this.prismaClient.color.update({
        data: { is_deleted: true },
        where: { color_id: color_id },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
export default ColorRepository;
