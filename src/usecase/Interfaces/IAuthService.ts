import { AdminDTO } from "../../domain/DTOs";

interface IAuthService {
  authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<AdminDTO | null>;
  validateToken(token: string): AdminDTO | null;
  generateToken(adminDto: AdminDTO): string;
  encryptPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
export { IAuthService };
