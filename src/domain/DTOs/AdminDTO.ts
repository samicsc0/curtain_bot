interface AdminDTO {
  admin_id: string;
  admin_first_name: string;
  admin_last_name: string;
  admin_email: string;
}
interface AdminCreateDTO {
  admin_first_name: string;
  admin_last_name: string;
  admin_email: string;
  admin_password: string;
}
export { AdminDTO, AdminCreateDTO };
