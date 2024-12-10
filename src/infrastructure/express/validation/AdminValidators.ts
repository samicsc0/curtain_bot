import { z } from "zod";

const LoginAdminValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(12),
});
const CreateAdminValidator = z.object({
  admin_first_name: z.string().min(3).max(10),
  admin_last_name: z.string().min(3).max(10),
  admin_email: z.string().email(),
  admin_password: z.string().min(8).max(12),
});
const UpdateAdminEmailValidator = z.object({
  admin_email: z.string().email(),
});
const UpdateAdminPasswordValidator = z.object({
  old_admin_password: z.string().min(8).max(12),
  new_admin_password: z.string().min(8).max(12),
});
export {
  LoginAdminValidator,
  CreateAdminValidator,
  UpdateAdminEmailValidator,
  UpdateAdminPasswordValidator,
};
