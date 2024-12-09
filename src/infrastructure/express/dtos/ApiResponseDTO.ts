export default interface ApiResponseDTO<T> {
  statusCode: number;
  message: string;
  data: T;
  page?: number;
  totalData?: number;
}
