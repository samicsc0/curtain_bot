import { AdminDTO } from "../../../domain/DTOs";
import {
  GetAdminByEmailUseCase,
  GetAdminPasswordUseCaseByEmail,
} from "../../../usecase/Admin";
import { IAuthService } from "../../../usecase/Interfaces";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { IAdminRepository } from "../../../domain/Repositories";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

class AuthenticationAuthorizationServices implements IAuthService {
  constructor(private _adminRepository: IAdminRepository) {
    this._adminRepository = _adminRepository;
  }
  /**
   *
   *
   * @param {string} password
   * @return {*}  {Promise<string>}
   * @memberof AuthenticationAuthorizationServices
   */
  async encryptPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
  }
  /**
   *
   *
   * @param {string} password
   * @param {string} hashedPassword
   * @return {*}  {Promise<boolean>}
   * @memberof AuthenticationAuthorizationServices
   */
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
  /**
   *
   *
   * @param {{
   *     email: string;
   *     password: string;
   *   }} credentials
   * @return {*}  {(Promise<AdminDTO | null>)}
   * @memberof AuthenticationAuthorizationServices
   */
  async authenticate(credentials: {
    email: string;
    password: string;
  }): Promise<AdminDTO | null> {
    const getAdminByEmailUseCase = new GetAdminByEmailUseCase(
      this._adminRepository
    );
    const getAdminPasswordByEmailUseCase = new GetAdminPasswordUseCaseByEmail(
      this._adminRepository
    );
    const findByEmail = await getAdminByEmailUseCase.execute(credentials.email);
    if (findByEmail) {
      const adminPassword = await getAdminPasswordByEmailUseCase.execute(
        credentials.email
      );
      if (
        typeof adminPassword === "string" &&
        (await AuthenticationAuthorizationServices.comparePassword(
          credentials.password,
          adminPassword
        )) === true
      ) {
        return findByEmail;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  /**
   *
   *
   * @param {string} token
   * @return {*}  {(AdminDTO | null)}
   * @memberof AuthenticationAuthorizationServices
   */
  static validateToken(token: string): AdminDTO | null {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      if (decoded) {
        const adminDto: AdminDTO = {
          admin_email: "",
          admin_first_name: "",
          admin_id: "",
          admin_last_name: "",
        };
        return adminDto;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
  /**
   *
   *
   * @param {AdminDTO} adminDto
   * @return {*}  {string}
   * @memberof AuthenticationAuthorizationServices
   */
  generateToken(adminDto: AdminDTO): string {
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = currentTime + 864000;
    const token = jwt.sign(adminDto, JWT_SECRET, {
      expiresIn: expirationTime,
    });
    return token;
  }
}
export default AuthenticationAuthorizationServices;
