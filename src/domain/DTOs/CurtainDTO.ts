import { CurtainCategory } from "../value-objects";

interface CreateCurtainDTO {
  curtain_name: string;
  curtain_category: CurtainCategory;
  curtain_image_url: string;
  curtain_base_price: number;
  curtain_color: string;
  curtain_description: string;
}
interface CurtainDto {
  curtain_id: string;
  curtain_name: string;
  curtain_category: CurtainCategory;
  curtain_image_url: string;
  curtain_base_price: number;
  curtain_color: { color_id: string; color_name: string };
  curtain_description: string;
  is_active: boolean;
}
interface UpdateCurtainDTO {
  curtain_name: string;
  curtain_category: CurtainCategory;
  curtain_base_price: number;
  curtain_color: string;
  curtain_description: string;
}
export { CreateCurtainDTO, CurtainDto, UpdateCurtainDTO };
