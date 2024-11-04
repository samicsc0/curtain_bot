import { CurtainCategory } from "../value-objects";

class Curtain {
  private curtain_id: string;
  private curtain_name: string;
  private curtain_category: CurtainCategory;
  private curtain_image_url: string;
  private curtain_base_price: number;

  constructor(
    curtain_id: string,
    curtain_name: string,
    curtain_category: CurtainCategory,
    curtain_image_url: string,
    curtain_base_price: number
  ) {
    this.curtain_id = curtain_id;
    this.curtain_name = curtain_name;
    this.curtain_category = curtain_category;
    this.curtain_image_url = curtain_image_url;
    this.curtain_base_price = curtain_base_price;
  }

  public getCurtainDetails() {
    return {
      id: this.curtain_id,
      name: this.curtain_name,
      category: this.curtain_category,
      imageUrl: this.curtain_image_url,
      basePrice: this.curtain_base_price,
    };
  }
}

export { Curtain };
