import { AdminDTO } from "../../domain/DTOs";

interface IAuthService {
  authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<AdminDTO | null>;
  generateToken(adminDto: AdminDTO): string;
  encryptPassword(password: string): Promise<string>;
}
export { IAuthService };
