import { CurtainCategory } from '../value-objects';

interface CreateCurtainDTO {
  curtain_name: string;
  curtain_category: CurtainCategory;
  curtain_image_url: string;
  curtain_base_price: number;
}
export { CreateCurtainDTO };
