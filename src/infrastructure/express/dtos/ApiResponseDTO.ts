export default interface ApiResponseDTO<T> {
  status: "Success" | "Fail";
  statusCode: number;
  message: string;
  data: T;
  page?: number;
  totalData?: number;
}
