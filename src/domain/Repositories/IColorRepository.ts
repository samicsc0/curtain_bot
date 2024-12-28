import { ColorDTO } from "../DTOs";

interface IColorRepository {
  getColors(): Promise<ColorDTO[]>;
  getColorById(color_id: string): Promise<ColorDTO | null>;
  createColor(color_name: string): Promise<ColorDTO>;
  updateColor(color_id: string, color_name: string): Promise<ColorDTO | null>;
  deleteColor(color_id: string): Promise<ColorDTO>;
}
export { IColorRepository };
