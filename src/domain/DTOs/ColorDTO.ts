interface ColorDTO {
  color_id: string;
  color_name: string;
}
interface CreateColorDTO {
  color_name: string;
}
interface ColorResponseDTO {
  color_id: string;
  color_name: string;
}
export { ColorDTO, CreateColorDTO, ColorResponseDTO };
