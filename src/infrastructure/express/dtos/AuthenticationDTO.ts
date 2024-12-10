import { AdminDTO } from "../../../domain/DTOs";

export default interface AuthenticationDTO{
    userInfo:AdminDTO,
    token: string,
}