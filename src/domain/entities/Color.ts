export class Color {
  private color_id: string;
  private color_name: string;
  constructor(color_id: string, color_name: string) {
    this.color_id = color_id;
    this.color_name = color_name;
  }
  getColor() {
    return {
      color_id: this.color_id,
      color_name: this.color_name,
    };
  }
}
