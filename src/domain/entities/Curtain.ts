import { CurtainCategory } from "../value-objects";

class Curtain {
  private curtain_id: string;
  private curtain_name: string;
  private curtain_category: CurtainCategory;
  private curtain_image_url: string;
  private curtain_base_price: number;
  private curtain_description: string;
  private curtain_color: string;
  private is_active: boolean;
  private is_deleted: boolean;

  constructor(
    curtain_id: string,
    curtain_name: string,
    curtain_category: CurtainCategory,
    curtain_image_url: string,
    curtain_base_price: number,
    curtain_description: string,
    curtain_color: string,
    is_active: boolean,
    is_deleted: boolean
  ) {
    this.curtain_id = curtain_id;
    this.curtain_name = curtain_name;
    this.curtain_category = curtain_category;
    this.curtain_image_url = curtain_image_url;
    this.curtain_base_price = curtain_base_price;
    this.curtain_description = curtain_description;
    this.curtain_color = curtain_color;
    this.is_active = is_active;
    this.is_deleted = is_deleted;
  }

  public getCurtainDetails() {
    return {
      id: this.curtain_id,
      name: this.curtain_name,
      category: this.curtain_category,
      imageUrl: this.curtain_image_url,
      basePrice: this.curtain_base_price,
      color: this.curtain_color,
      description: this.curtain_description,
      isActive: this.is_active,
      isDeleted: this.is_deleted,
    };
  }
}

export { Curtain };
